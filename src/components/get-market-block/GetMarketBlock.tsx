import React from 'react'
import { Header } from '../header/Header'
import { RedButton } from '@shared/red-button/RedButton'
import { FormModal } from '@components/form-modal/FormModal'
import FirstBubble from '@assets/images/first-bubble.png'
import SecondBubble from '@assets/images/second-bubble.png'
import ThirdBubble from '@assets/images/third-bubble.png'
import ForthBubble from '@assets/images/forth-bubble.png'
import FirstBubbleMobile from '@assets/images/first-bubble-mobile.png'
import SecondBubbleMobile from '@assets/images/second-bubble-mobile.png'
import ThirdBubbleMobile from '@assets/images/third-bubble-mobile.png'

import styles from './GetMarketBlock.module.scss'

export const GetMarketBlock = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const buttonTitle = 'Получить свой маркет'

  return (
    <section className={styles.section}>
      <Header />
      <div className={styles.columnDiv}>
        <h1 className={styles.header}>
          <span className={styles.headerTop}>
            Запустите нишевый маркетплейс
          </span>
          <span className={styles.headerBottom}>
            с полной кастомизацией под ваш бизнес
          </span>
        </h1>
        <RedButton text={buttonTitle} onClick={() => setIsModalOpen(true)} />
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          buttonTitle={buttonTitle}
        />
      </div>
      <div className={styles.imageContainer}>
        <img
          src={FirstBubble}
          alt='first bubble'
          className={`${styles.image} ${styles.image1}`}
        />
        <img
          src={SecondBubble}
          alt='second bubble'
          className={`${styles.image} ${styles.image2}`}
        />
        <img
          src={ThirdBubble}
          alt='third bubble'
          className={`${styles.image} ${styles.image3}`}
        />
        <img
          src={ForthBubble}
          alt='forth bubble'
          className={`${styles.image} ${styles.image4}`}
        />
      </div>
      <div className={styles.imageContainerMobile}>
        <img
          src={FirstBubbleMobile}
          alt='first bubble'
          className={`${styles.image} ${styles.imageFirstMobile}`}
        />
        <img
          src={SecondBubbleMobile}
          alt='second bubble'
          className={`${styles.image} ${styles.imageSecondMobile}`}
        />
        <img
          src={ThirdBubbleMobile}
          alt='third bubble'
          className={`${styles.image} ${styles.imageThirdMobile}`}
        />
      </div>
    </section>
  )
}
