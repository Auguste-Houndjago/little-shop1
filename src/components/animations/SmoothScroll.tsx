'use client'

import { useEffect, useRef } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
  targetId: string
}

export default function SmoothScroll({ children, targetId }: SmoothScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [targetId])

  return <div ref={sectionRef}>{children}</div>
}

