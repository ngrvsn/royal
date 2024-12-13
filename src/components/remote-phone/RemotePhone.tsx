import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import RemoteControl from '@assets/images/remote-control.png'

import styles from './RemotePhone.module.scss'

interface IRemotePhoneProps {
  onAnimationsComplete: (stage: number) => void
}

export const RemotePhone: React.FC<IRemotePhoneProps> = ({
  onAnimationsComplete
}) => {
  const imageRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const sliderRef = useIntersectionObserver({
    onEnter: (entry) => {
      entry.target.classList.add(styles.visible)
      setTimeout(() => {
        onAnimationsComplete(1)
        document.querySelectorAll(`.${styles.orbit}`).forEach((orbit) => {
          orbit.classList.add(styles.visible)
        })
        setTimeout(() => {
          onAnimationsComplete(2)
        }, 1300)
      }, 1300)
      setTimeout(() => {
        onAnimationsComplete(2)
      }, 3600)
    }
  })

  const orbitRef = useIntersectionObserver({
    onEnter: () => {}
  })

  return (
    <div
      className={styles.imageWrapper}
      ref={(el) => el && imageRef.current.push(el)}
    >
      <img
        src={RemoteControl}
        alt='remote control image'
        className={styles.image}
      />

      <div className={styles.sliderWrapper}>
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            className={styles.slider}
            ref={(el) => el && sliderRef.current.push(el)}
            id={`slider${id}`}
          >
            <div className={styles.sliderTop}></div>
            <div className={styles.sliderIcon}></div>
          </div>
        ))}
      </div>
      <div className={styles.orbitsWrapper}>
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className={styles.orbit}
            ref={(el) => el && orbitRef.current.push(el)}
          >
            <svg
              viewBox='-8 -8 100 100'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* Внешний круг */}
              <circle
                cx='42'
                cy='42'
                r='40'
                stroke='#D9D9D9'
                strokeWidth='1.8'
              />
              {/* Средний круг */}
              <circle
                cx='42'
                cy='42'
                r='24'
                stroke='#D9D9D9'
                strokeWidth='4.6'
              />
              {/* Центральный круг */}
              <circle cx='42' cy='42' r='13' fill='#7B7B7B' />
              {/* Путь для анимации серой линии */}
              <path
                className={styles.orbitPath}
                d='M42 2 A40 40 0 1 0 42 82 A40 40 0 1 0 42 2'
                stroke='#7B7B7B'
                strokeWidth='4.6'
                strokeLinecap='round'
              />
              {/* Белый кружок */}
              <circle
                className={styles.orbitDot}
                cx='42'
                cy='2'
                r='8'
                fill='white'
                stroke='#D9D9D9'
                strokeWidth='2.4'
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
