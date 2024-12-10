import { useEffect, useRef } from 'react'

interface IUseIntersectionObserverOptions extends IntersectionObserverInit {
  onEnter?: (entry: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
}

export const useIntersectionObserver = ({
  onEnter,
  onLeave,
  ...observerOptions
}: IUseIntersectionObserverOptions = {}) => {
  const elementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter?.(entry)
        } else {
          onLeave?.(entry)
        }
      })
    }, observerOptions)

    elementsRef.current.forEach((el) => observer.observe(el))

    return () => {
      elementsRef.current.forEach((el) => observer.unobserve(el))
    }
  }, [onEnter, onLeave, observerOptions])

  return elementsRef
}
