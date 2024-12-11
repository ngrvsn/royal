import { useRef, useEffect } from 'react'
import styles from './RedButton.module.scss'

interface IButtonProps {
  text: string
  animate?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const RedButton: React.FC<IButtonProps> = ({
  text,
  animate = false,
  type = 'button',
  onClick
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!animate || !buttonRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(buttonRef.current)

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current)
      }
    }
  }, [animate])

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`${styles.button} ${animate ? styles.animated : ''}`}
    >
      <p className={styles.text}>{text}</p>
    </button>
  )
}
