import { useState, useEffect } from 'react'
import styles from './CheckCircle.module.scss'

interface CheckCircleProps {
  delay: number
  id: string
}

export const CheckCircle: React.FC<CheckCircleProps> = ({ delay, id }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.5 }
    )

    const el = document.getElementById(id)
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [delay, id])

  return (
    <div
      id={id}
      className={`${styles.circle} ${isVisible ? styles.visible : ''}`}
    ></div>
  )
}
