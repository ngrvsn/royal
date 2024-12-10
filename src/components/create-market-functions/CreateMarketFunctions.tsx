import React from 'react'
import { FormModal } from '@components/form-modal/FormModal'
import { RedButton } from '@shared/red-button/RedButton'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

import styles from './CreateMarketFunctions.module.scss'

const data = [
  {
    id: 1,
    title: 'Малого и крупного бизнеса',
    description:
      'Собственная торговая платформа - ключ к расширению на рынке, конкурентоспособности, росту бренда и улучшению взаимоотношений с клиентами'
  },
  {
    id: 2,
    title: 'Офлайн-бизнеса',
    description:
      'Открытие нового канала продаж поможет привлечь покупателей и расширить аудиторию, а значит, даст рост выручки и популярности бренда среди реальных и потенциальных клиентов'
  },
  {
    id: 3,
    title: 'Интернет-магазинов',
    description:
      'Масштабирование через новую платформу монетизации позволит более эффективно управлять ассортиментом, привлекать новых покупателей и увеличивать доход, оптимизируя управление бизнесом'
  },
  {
    id: 4,
    title: 'Продавцов с маркетплейсов',
    description:
      'Свобода от часто меняющихся условий сторонних площадок продаж - важный шаг к независимости. Самостоятельно контролируйте стратегию продаж и улучшайте условия работы, минимизируя риски и убытки.'
  }
]

export const CreateMarketFunctions: React.FC = () => {
  const [activeId, setActiveId] = React.useState<number | null>(1)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const buttonTitle = 'Создать свой маркетплейс'

  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const elementsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const mobileElementsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.container} id='work'>
      <h2
        ref={(el) => el && headerRef.current.push(el)}
        className={`${styles.header}`}
      >
        Мы собрали все функции в одном месте, чтобы обеспечить удобство и
        автоматизацию процессов для:
      </h2>
      <div className={styles.content}>
        {data.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (elementsRef.current[index] = el!)}
            className={`${styles.row} ${activeId === item.id ? styles.active : ''}`}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <div
              className={`${styles.leftColumn} ${activeId === item.id ? styles.activeLeftColumn : ''}`}
            >
              {item.title}
              <div
                className={`${styles.indicator} ${activeId === item.id ? styles.activeIndicator : ''}`}
              ></div>
            </div>
            <div className={styles.rightColumn}>
              <div
                className={`${styles.description} ${activeId === item.id ? styles.activeText : ''}`}
              >
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.contentMobile}>
        {data.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (mobileElementsRef.current[index] = el!)}
            className={`${styles.contentMobileWrapper}`}
          >
            <div className={styles.leftColumn}>{item.title}</div>

            <div className={styles.description}>{item.description}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <RedButton
          text={buttonTitle}
          onClick={() => setIsModalOpen(true)}
          animate={true}
        />
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonTitle={buttonTitle}
      />
    </div>
  )
}
