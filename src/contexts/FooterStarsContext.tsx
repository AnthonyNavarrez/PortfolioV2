import { createContext, useContext, useState, type ReactNode } from 'react'

export type Pt = { id: string; fx: number; fy: number }
export type StarLink = { id: string; a: Pt; b: Pt; delay: number }

interface FooterStarsState {
  placed: Pt[]
  links: StarLink[]
  lit: Record<string, number>
  setPlaced: React.Dispatch<React.SetStateAction<Pt[]>>
  setLinks: React.Dispatch<React.SetStateAction<StarLink[]>>
  setLit: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

const FooterStarsContext = createContext<FooterStarsState | null>(null)

export function FooterStarsProvider({ children }: { children: ReactNode }) {
  const [placed, setPlaced] = useState<Pt[]>([])
  const [links, setLinks] = useState<StarLink[]>([])
  const [lit, setLit] = useState<Record<string, number>>({})

  return (
    <FooterStarsContext.Provider value={{ placed, links, lit, setPlaced, setLinks, setLit }}>
      {children}
    </FooterStarsContext.Provider>
  )
}

export function useFooterStars() {
  const ctx = useContext(FooterStarsContext)
  if (!ctx) throw new Error('useFooterStars must be used within FooterStarsProvider')
  return ctx
}
