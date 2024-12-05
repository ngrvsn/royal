import React from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import AppCase from '@assets/images/app-case.png'
import ShopCase from '@assets/images/shop-case.png'
import MarketCase from '@assets/images/market-case.png'
import TinderCase from '@assets/images/tinder-case.png'
import ExpandIcon from '@assets/icons/expand-icon.svg'
import CloseIcon from '@assets/icons/close-icon.svg'

import styles from './CasesBlock.module.scss'

export const CasesBlock: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const tabsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const imageRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const [activeId, setActiveId] = React.useState<number>(1)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const data = [
    { id: 1, image: AppCase, title: 'Интернет-магазин' },
    { id: 2, image: ShopCase, title: 'Мобильное приложение' },
    { id: 3, image: MarketCase, title: 'Маркет услуг' },
    { id: 4, image: TinderCase, title: 'Тиндер для лошадей' }
  ]

  React.useEffect(() => {
    data.forEach((item) => {
      const img = new Image()
      img.src = item.image
    })
  }, [])

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  return (
    <div className={styles.wrapper}>
      <div className={styles.widhtWrapper}>
        <div className={styles.headerWrapper}>
          <h2
            ref={(el) => el && headerRef.current.push(el)}
            className={styles.header}
          >
            Кейсы
          </h2>
        </div>
        <div
          className={styles.tabs}
          ref={(el) => el && tabsRef.current.push(el)}
        >
          {data.map((item) => (
            <div
              key={item.id}
              className={`${styles.tab} ${
                activeId === item.id ? styles.active : ''
              }`}
              onClick={() => setActiveId(item.id)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div
          ref={(el) => el && tabsRef.current.push(el)}
          className={`${styles.extraTab} ${
            activeId === data[data.length - 1].id ? styles.active : ''
          }`}
          onClick={() => setActiveId(data[data.length - 1].id)}
        >
          {data[data.length - 1].title}
        </div>
        <div
          className={styles.content}
          ref={(el) => el && imageRef.current.push(el)}
        >
          <img
            src={data.find((item) => item.id === activeId)?.image}
            alt={data.find((item) => item.id === activeId)?.title}
            className={styles.image}
          />
          <button className={styles.expandButton} onClick={toggleModal}>
            <img
              src={ExpandIcon}
              alt='Увеличение изображения'
              className={styles.expandIcon}
            />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={data.find((item) => item.id === activeId)?.image}
              alt={data.find((item) => item.id === activeId)?.title}
              className={styles.modalImage}
            />
            <button className={styles.closeButton} onClick={toggleModal}>
              <img src={CloseIcon} alt='Закрыть' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
