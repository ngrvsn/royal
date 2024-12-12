import React from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import AppCase from '@assets/images/app-case.png'
import ShopCase from '@assets/images/shop-case.png'
import MarketCase from '@assets/images/market-case.png'
import TinderCase from '@assets/images/tinder-case.png'
import ExpandIcon from '@assets/icons/expand-icon.svg'
import CloseIcon from '@assets/icons/close-icon.svg'

const AppCase2x = () =>
  import('@assets/images/app-case2x.png').then((module) => module.default)
const ShopCase2x = () =>
  import('@assets/images/shop-case2x.png').then((module) => module.default)
const MarketCase2x = () =>
  import('@assets/images/market-case2x.png').then((module) => module.default)
const TinderCase2x = () =>
  import('@assets/images/tinder-case2x.png').then((module) => module.default)

import styles from './CasesBlock.module.scss'

interface CaseItem {
  id: number
  image: string
  getImage2x: () => Promise<string>
  title: string
}

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
  const [highResImage, setHighResImage] = React.useState<string | null>(null)

  const data: CaseItem[] = [
    {
      id: 1,
      image: AppCase,
      getImage2x: AppCase2x,
      title: 'Интернет-магазин'
    },
    {
      id: 2,
      image: ShopCase,
      getImage2x: ShopCase2x,
      title: 'Мобильное приложение'
    },
    {
      id: 3,
      image: MarketCase,
      getImage2x: MarketCase2x,
      title: 'Маркет услуг'
    },
    {
      id: 4,
      image: TinderCase,
      getImage2x: TinderCase2x,
      title: 'Тиндер для лошадей'
    }
  ]

  React.useEffect(() => {
    data.forEach((item) => {
      const img = new Image()
      img.src = item.image
    })
  }, [])

  React.useEffect(() => {
    if (isModalOpen) {
      const activeItem = data.find((item) => item.id === activeId)
      if (activeItem) {
        activeItem.getImage2x().then((src) => {
          setHighResImage(src)
        })
      }
    } else {
      setHighResImage(null)
    }
  }, [isModalOpen, activeId])

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  return (
    <div className={styles.wrapper} id='cases'>
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
              loading='lazy'
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
              src={
                highResImage || data.find((item) => item.id === activeId)?.image
              }
              alt={data.find((item) => item.id === activeId)?.title}
              className={styles.modalImage}
            />
            <button className={styles.closeButton} onClick={toggleModal}>
              <img src={CloseIcon} alt='Закрыть' loading='lazy' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
