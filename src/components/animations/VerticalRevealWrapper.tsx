'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface VerticalRevealWrapperProps {
  children: React.ReactNode
}

const VerticalRevealWrapper: React.FC<VerticalRevealWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topCurtainRef = useRef<HTMLDivElement>(null)
  const bottomCurtainRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight)
    }
  }, [children])

  useEffect(() => {
    if (wrapperRef.current && topCurtainRef.current && bottomCurtainRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: `bottom bottom`,
          scrub: 1,
        },
      })

      tl.to(topCurtainRef.current, {
        yPercent: -100,
        ease: 'power2.inOut',
      })
      tl.to(
        bottomCurtainRef.current,
        {
          yPercent: 100,
          ease: 'power2.inOut',
        },
        '<'
      )
    }
  }, [contentHeight])

  return (
    <>
      <div ref={wrapperRef} style={{ height: contentHeight }} />
      <div className="sticky top-0" style={{ height: contentHeight }}>
        <div ref={contentRef} className="relative overflow-hidden">
          <div
            ref={topCurtainRef}
            className="absolute top-0 left-0 w-full h-1/2 text-white bg-black z-10"
          >
            ma bite
          </div>
          <div
            ref={bottomCurtainRef}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-10"
          />
          <div className="relative z-0">{children}</div>
        </div>
      </div>
    </>
  )
}

export default VerticalRevealWrapper

