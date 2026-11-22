import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import StarsBg from './StarsBg'
import { supabase } from '../lib/supabase'
import { cleanText } from '../lib/profanity'
import sparkleDiamond from '../assets/v3/sparkle-diamond.svg'
import ellipsePurple from '../assets/v3/ellipse-purple.svg'
import nebulaPurple from '../assets/v3/nebula-purple.svg'
import caretLeft from '../assets/v3/icon-caret-left.svg'
import iconTrash from '../assets/v3/icon-trash.svg'
import iconEdit from '../assets/v3/icon-edit.svg'
import './WishesPage.css'

const DEFAULT_COLOR = '#e45af6'

interface Wish {
  id: string
  text: string
  fx: number
  fy: number
  color: string
}

export default function WishesPage() {
  const skyRef   = useRef<HTMLDivElement>(null)
  const colorRef = useRef<HTMLInputElement>(null)
  const dragRef  = useRef<{ id: string; moved: boolean; fx: number; fy: number } | null>(null)
  const [wishes, setWishes]         = useState<Wish[]>([])
  const [myIds, setMyIds]           = useState<Set<string>>(new Set())
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [pending, setPending]       = useState<{ fx: number; fy: number } | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [color, setColor]           = useState(DEFAULT_COLOR)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editingId, setEditingId]   = useState<string | null>(null)
  const [editValue, setEditValue]   = useState('')

  useEffect(() => {
    supabase.from('Wishes').select('*').then(({ data }) => {
      if (data) setWishes(data as Wish[])
    })

    const channel = supabase.channel('wishes-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Wishes' },
        ({ new: row }) => {
          setWishes(w => w.some(x => x.id === row.id) ? w : [...w, row as Wish])
        })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'Wishes' },
        ({ old: row }) => {
          setWishes(w => w.filter(x => x.id !== row.id))
        })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Wishes' },
        ({ new: row }) => {
          setWishes(w => w.map(x => x.id === row.id ? row as Wish : x))
        })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleWishMouseDown = (e: React.MouseEvent, w: Wish) => {
    if ((e.target as HTMLElement).closest('button,input,a')) return
    e.stopPropagation()
    dragRef.current = { id: w.id, moved: false, fx: w.fx, fy: w.fy }
    setDraggingId(w.id)

    const sky = skyRef.current
    if (!sky) return

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return
      const rect = sky.getBoundingClientRect()
      const fx = Math.max(0.01, Math.min(0.99, (ev.clientX - rect.left) / rect.width))
      const fy = Math.max(0.01, Math.min(0.99, (ev.clientY - rect.top) / rect.height))
      dragRef.current.moved = true
      dragRef.current.fx = fx
      dragRef.current.fy = fy
      const dragId = dragRef.current.id
      setWishes(prev => prev.map(x => x.id === dragId ? { ...x, fx, fy } : x))
    }

    const onUp = async () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      setDraggingId(null)
      if (!dragRef.current) return
      const { id, moved, fx, fy } = dragRef.current
      dragRef.current = null
      if (moved) {
        await supabase.from('Wishes').update({ fx, fy }).eq('id', id)
      } else {
        setSelectedId(prev => prev === id ? null : id)
        setEditingId(null)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const handleSkyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a,button,input,textarea,.wish-popup,.wish-item')) return
    if (selectedId) { setSelectedId(null); setEditingId(null); return }
    const el = skyRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const fx = (e.clientX - rect.left) / rect.width
    const fy = (e.clientY - rect.top) / rect.height
    setPending({ fx, fy })
    setInputValue('')
  }

  const deleteWish = async (id: string) => {
    setWishes(w => w.filter(x => x.id !== id))
    setSelectedId(null)
    await supabase.from('Wishes').delete().eq('id', id)
  }

  const startEdit = (w: Wish) => {
    setEditingId(w.id)
    setEditValue(w.text)
  }

  const commitEdit = async () => {
    if (!editingId) return
    const newText = editValue.trim()
    setWishes(w => w.map(x => x.id === editingId ? { ...x, text: newText || x.text } : x))
    setEditingId(null)
    setSelectedId(null)
    if (newText) await supabase.from('Wishes').update({ text: newText }).eq('id', editingId)
  }

  const shoot = async () => {
    if (!pending) return
    const text = inputValue.trim()
    setPending(null)
    setInputValue('')
    if (!text) return

    const { data } = await supabase
      .from('Wishes')
      .insert({ text: cleanText(text), fx: pending.fx, fy: pending.fy, color })
      .select()
      .single()

    if (data) {
      setMyIds(ids => new Set([...ids, data.id]))
      setWishes(w => w.some(x => x.id === data.id) ? w : [...w, data as Wish])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') shoot()
    if (e.key === 'Escape') { setPending(null); setInputValue('') }
  }

  const popupLeft = pending ? Math.min(Math.max(pending.fx * 100, 16), 84) : 0
  const popupTop  = pending ? Math.min(Math.max(pending.fy * 100, 0),  90) : 0

  return (
    <div className="wishes-page">
      <Sidebar />

      <main className="wishes-page__main">
        <StarsBg className="wishes__stars" speed={12} factor={0.015} density={1} motion="float" />

        <img src={nebulaPurple} alt="" className="wishes__nebula" />
        <img src={ellipsePurple} alt="" className="wishes__ellipse" />

        <Link to="/" className="wishes__back">
          <img src={caretLeft} alt="" className="wishes__back-icon" />
          <span>Back</span>
        </Link>

        <h1 className="wishes__heading">Share a wish</h1>

        <div ref={skyRef} className="wishes__sky" data-cursor="add" onClick={handleSkyClick}>
          {wishes.map(w => {
            const isUserWish = myIds.has(w.id)
            const isSelected = isUserWish && selectedId === w.id
            const isEditing  = isUserWish && editingId === w.id
            return (
              <div
                key={w.id}
                data-cursor="star"
                className={`wish-item${isUserWish ? ' wish-item--user' : ''}${isSelected ? ' wish-item--selected' : ''}${draggingId === w.id ? ' wish-item--dragging' : ''}`}
                style={{ left: `${w.fx * 100}%`, top: `${w.fy * 100}%`, '--wish-color': w.color } as React.CSSProperties}
                onMouseDown={isUserWish ? (e) => handleWishMouseDown(e, w) : undefined}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={sparkleDiamond} alt="" className="wish-item__sparkle" />
                {isEditing ? (
                  <input
                    autoFocus
                    className="wish-item__edit-input"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditingId(null) }}
                    onBlur={commitEdit}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <span className="wish-item__text" data-text={w.text}>{w.text}</span>
                )}
                {isSelected && !isEditing && (
                  <div className="wish-item__actions" onClick={e => e.stopPropagation()}>
                    <button className="wish-item__action-btn" data-label="Delete" onClick={() => deleteWish(w.id)}>
                      <img src={iconTrash} alt="Delete" />
                    </button>
                    <button className="wish-item__action-btn" data-label="Edit" onClick={() => startEdit(w)}>
                      <img src={iconEdit} alt="Edit" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          {pending && (
            <div
              className="wish-popup"
              style={{ left: `${popupLeft}%`, top: `${popupTop}%` }}
              onClick={e => e.stopPropagation()}
            >
              <input
                autoFocus
                className="wish-popup__input"
                placeholder="make a wish"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div
                className="wish-popup__color-swatch"
                style={{ background: color }}
                onClick={() => colorRef.current?.click()}
              />
              <input
                ref={colorRef}
                type="color"
                className="wish-popup__color-picker"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
