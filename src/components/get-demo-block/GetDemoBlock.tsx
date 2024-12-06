import { RedButton } from '@shared/red-button/RedButton'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

import styles from './GetDemoBlock.module.scss'

export const GetDemoBlock: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.wrapper}>
      <h2
        ref={(el) => el && headerRef.current.push(el)}
        className={`${styles.header}`}
      >
        Мы уверены в качестве нашего продукта и готовы к тому, чтобы
        продемонстрировать его эффективность
      </h2>
      <RedButton text='Получить демо' animate={true} />
    </div>
  )
}
