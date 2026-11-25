import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Section { id: string; label: string }

interface CtxValue {
  sections: Section[]
  setSections: (s: Section[]) => void
  navHeader: ReactNode
  setNavHeader: (node: ReactNode) => void
  navSubHeader: ReactNode
  setNavSubHeader: (node: ReactNode) => void
}

const NavSidebarCtx = createContext<CtxValue>({
  sections: [], setSections: () => {},
  navHeader: null, setNavHeader: () => {},
  navSubHeader: null, setNavSubHeader: () => {},
})

export function NavSidebarProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([])
  const [navHeader, setNavHeader] = useState<ReactNode>(null)
  const [navSubHeader, setNavSubHeader] = useState<ReactNode>(null)
  return (
    <NavSidebarCtx.Provider value={{ sections, setSections, navHeader, setNavHeader, navSubHeader, setNavSubHeader }}>
      {children}
    </NavSidebarCtx.Provider>
  )
}

export function useNavSidebarCtx() {
  return useContext(NavSidebarCtx)
}

// Hook for pages to register their sections
export function useSections(sections: Section[]) {
  const { setSections } = useNavSidebarCtx()
  useEffect(() => {
    setSections(sections)
    return () => setSections([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// Hook for pages to inject content into the top of the nav
export function useNavHeader(node: ReactNode) {
  const { setNavHeader } = useNavSidebarCtx()
  useEffect(() => {
    setNavHeader(node)
    return () => setNavHeader(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])
}

// Hook for pages to inject content below the nav links
export function useNavSubHeader(node: ReactNode) {
  const { setNavSubHeader } = useNavSidebarCtx()
  useEffect(() => {
    setNavSubHeader(node)
    return () => setNavSubHeader(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])
}
