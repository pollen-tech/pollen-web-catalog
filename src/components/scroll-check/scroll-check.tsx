import React, { useEffect, useRef, useState } from 'react'

const ScrollChecker: React.FC = () => {
  const [isBottom, setIsBottom] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = contentRef.current!
    setIsBottom(scrollTop + clientHeight === scrollHeight)
  }

  useEffect(() => {
    contentRef.current!.addEventListener('scroll', handleScroll)
    return () => {
      contentRef.current!.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={contentRef}
      style={{ height: '200px', overflow: 'auto', border: '1px solid black' }}
    >
      <div style={{ height: '800px' }}>
        {isBottom ? (
          <p>Reached bottom!</p>
        ) : (
          <p>Scroll down to reach the bottom.</p>
        )}
      </div>
    </div>
  )
}

export default ScrollChecker
