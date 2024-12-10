import { useEffect, useCallback } from 'react'

type ScrollLockOptions = {
  reserveScrollBarGap?: boolean
}

export const useScrollLock = (
  isLocked: boolean,
  options: ScrollLockOptions = {}
) => {
  const lockScroll = useCallback(() => {
    const position = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (options.reserveScrollBarGap) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, position)
  }, [options.reserveScrollBarGap])

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    document.documentElement.style.scrollBehavior = ''
  }, [])

  useEffect(() => {
    if (isLocked) {
      lockScroll()
    } else {
      unlockScroll()
    }

    return () => {
      unlockScroll()
    }
  }, [isLocked, lockScroll, unlockScroll])
}
