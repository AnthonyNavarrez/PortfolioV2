import { useEffect, useMemo, useRef, useState } from 'react'
import { createMessageBlobs, type MessageBlobsHandle } from '../lib/message-blobs'
import { supabase, type BlobRow } from '../lib/supabase'
import { useNavHeader } from '../contexts/NavSidebarContext'
import './MessagePage.css'

const MAX_BLOBS = 30
const SESSION_KEY = 'blob-session-id'

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id) }
  return id
}

export default function MessagePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleRef    = useRef<MessageBlobsHandle | null>(null)
  const sessionId    = useRef(getSessionId())
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const navContent = useMemo(() => (
    <>
      <span className="msg-nav-count">
        {count === 0 ? 'No messages yet' : `${count} message${count !== 1 ? 's' : ''} afloat`}
      </span>
      <span className="msg-nav-hint">Click to add a blob</span>
    </>
  ), [count])

  useNavHeader(navContent)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let alive = true

    const handle = createMessageBlobs(el, {
      drift: 0.5,
      wobble: 0.5,
      onDrop: async ({ id: internalId, text, name, x, y, color }) => {
        setCount(c => Math.min(c + 1, MAX_BLOBS))
        const { data, error } = await supabase
          .from('blobs')
          .insert({
            text,
            name: name ?? null,
            color,
            x_pct: x / el.clientWidth,
            y_pct: y / el.clientHeight,
            session_id: sessionId.current,
          })
          .select('id')
          .single()
        if (error) console.error('[blobs] insert failed:', error)
        if (data && handleRef.current) handleRef.current.linkDbId(internalId, data.id)
      },
      onEdit: async (dbId, { text, name, color }) => {
        const { error } = await supabase
          .from('blobs')
          .update({ text, name: name ?? null, color })
          .eq('id', dbId)
        if (error) console.error('[blobs] update failed:', error)
      },
    })
    handleRef.current = handle

    // Load persisted blobs
    supabase
      .from('blobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(MAX_BLOBS)
      .then(({ data, error }) => {
        if (!alive) return
        setLoading(false)
        if (error) console.error('[blobs] load failed:', error)
        if (!data) return
        ;[...data].reverse().forEach((row: BlobRow) => {
          const own = row.session_id === sessionId.current
          handle.add(row.text, row.x_pct * el.clientWidth, row.y_pct * el.clientHeight, row.color, row.name ?? undefined, true, own, row.id)
          setCount(c => Math.min(c + 1, MAX_BLOBS))
        })
      })

    // Real-time: new blobs from other visitors
    const channel = supabase
      .channel('public:blobs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blobs' }, payload => {
        if (!alive) return
        const row = payload.new as BlobRow
        if (row.session_id === sessionId.current) return  // skip our own
        handle.add(row.text, row.x_pct * el.clientWidth, row.y_pct * el.clientHeight, row.color, row.name ?? undefined, true)
        setCount(c => Math.min(c + 1, MAX_BLOBS))
      })
      .subscribe()

    return () => {
      alive = false
      handle.dispose()
      supabase.removeChannel(channel)
      handleRef.current = null
    }
  }, [])

  return (
    <div ref={containerRef} className="msg-page">
      <div className="msg-mobile-header">
        <span className="msg-nav-count">
          {count === 0 ? 'No messages yet' : `${count} message${count !== 1 ? 's' : ''} afloat`}
        </span>
        <span className="msg-nav-hint">Tap to add a blob</span>
      </div>
      {loading && (
        <div className="msg-empty" aria-hidden="true">
          <p className="msg-empty__title">Loading<span className="msg-loading-dots"><span>.</span><span>.</span><span>.</span></span></p>
        </div>
      )}
      {!loading && count === 0 && (
        <div className="msg-empty" aria-hidden="true">
          <p className="msg-empty__title">Click anywhere to drop a message</p>
          <p className="msg-empty__sub">Type it, press Enter, and it floats off in a blob of ink.</p>
        </div>
      )}
    </div>
  )
}
