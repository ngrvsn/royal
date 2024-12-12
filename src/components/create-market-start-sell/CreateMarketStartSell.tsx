import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import GodsIcon from '@assets/icons/gods-icon.svg'
import ServicesIcon from '@assets/icons/services-icon.svg'
import InfoproductsIcon from '@assets/icons/infoproducts-icon.svg'
import ItIcon from '@assets/icons/it-icon.svg'
import CreativeIcon from '@assets/icons/creative-icon.svg'
import MultimarketsIcon from '@assets/icons/multimarkets-icon.svg'

import styles from './CreateMarketStartSell.module.scss'

const data = [
  { id: 1, icon: GodsIcon, title: 'Товары' },
  { id: 2, icon: InfoproductsIcon, title: 'Инфопродукты и курсы' },
  { id: 3, icon: CreativeIcon, title: 'Креатив и дизайн' },
  { id: 4, icon: ServicesIcon, title: 'Услуги' },
  { id: 5, icon: ItIcon, title: 'IT и цифровые продукты' },
  { id: 6, icon: MultimarketsIcon, title: 'Мульти-маркеты' }
]

export const CreateMarketStartSell: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const elementsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <section className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2
          ref={(el) => el && headerRef.current.push(el)}
          className={`${styles.header}`}
        >
          Легко и быстро запускайте продажи на собственном маркетплейсе во всех
          нишах:
        </h2>
      </div>
      <div className={styles.grid}>
        {data.map((category, index) => (
          <div
            key={category.id}
            ref={(el) => (elementsRef.current[index] = el!)}
            className={`${styles.card}`}
          >
            <img
              src={category.icon}
              alt={category.title}
              className={styles.icon}
            />
            <div className={styles.title}>{category.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
