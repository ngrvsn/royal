import { useRef, useEffect } from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

import styles from './RedButton.module.scss'

interface IButtonProps {
  text: string
  animate?: boolean
}

export const RedButton: React.FC<IButtonProps> = ({
  text,
  animate = false
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const elementsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  useEffect(() => {
    if (buttonRef.current && animate) {
      elementsRef.current.push(buttonRef.current)
    }
  }, [elementsRef, animate])

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${animate ? styles.animated : ''}`}
    >
      <p className={styles.text}>{text}</p>
    </button>
  )
}
