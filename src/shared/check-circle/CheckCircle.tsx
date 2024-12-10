import { useState, useEffect } from 'react'
import styles from './CheckCircle.module.scss'

interface ICheckCircleProps {
  delay: number
  id: string
}

export const CheckCircle: React.FC<ICheckCircleProps> = ({ delay, id }) => {
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
