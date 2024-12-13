import React from 'react'
import RoyalIcon from '@assets/icons/royal-logo.svg'
import ArrowUpRightBlackIcon from '@assets/icons/arrow-up-right-black.svg'
import TelegramIcon from '@assets/icons/telegram-icon.svg'
import { useScrollToElement } from '@hooks/useScrollToElement'
import { FormModal } from '@components/form-modal/FormModal'

import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  const scrollToElement = useScrollToElement()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const buttonTitle = 'Посмотреть демо'

  return (
    <footer className={styles.wrapper}>
      <section className={styles.desctopBlock}>
        <div className={styles.logoNavWrapper}>
          <img src={RoyalIcon} alt='Royal logo' className={styles.logo} />
          <nav className={styles.linksWrapper}>
            <button
              onClick={() => scrollToElement('work')}
              className={styles.link}
            >
              Преимущества работы с нами
            </button>
            <button
              onClick={() => scrollToElement('app')}
              className={styles.link}
            >
              Мобильное приложение
            </button>
            <button
              onClick={() => scrollToElement('cost')}
              className={styles.link}
            >
              Стоимость
            </button>
            <button
              onClick={() => scrollToElement('cases')}
              className={styles.link}
            >
              Кейсы
            </button>
          </nav>
        </div>
        <div className={styles.infoButtonsWrapper}>
          <div className={styles.infoWrapper}>
            <p className={styles.info}>Время работы: </p>
            <p className={styles.info}>пн-пт 10:00-20:00</p>
            <a href='tel:+74997556677' className={styles.link}>
              8 (499) 755-66-77
            </a>
            <p className={styles.info}>royalmarketing@info</p>
          </div>
          <div className={styles.buttonsWrapper}>
            <a
              href='https://t.me/Royalsoft01'
              target='_blank'
              className={styles.telegramLink}
            >
              <img src={TelegramIcon} alt='telegram' />
            </a>
            <button
              className={styles.demoButton}
              onClick={() => setIsModalOpen(true)}
            >
              <p className={styles.textButton}>{buttonTitle}</p>
              <img
                src={ArrowUpRightBlackIcon}
                alt='Arrow Icon'
                className={styles.arrow}
              />
            </button>
          </div>
        </div>
      </section>
      <section className={styles.mobileBlock}>
        <div className={styles.logoTelegramWrapper}>
          <img src={RoyalIcon} alt='Royal logo' className={styles.logo} />
          <a
            href='https://t.me/Royalsoft01'
            target='_blank'
            className={styles.telegramLink}
          >
            <img src={TelegramIcon} alt='telegram' />
          </a>
        </div>

        <div className={styles.infoMobileWrapper}>
          <button
            onClick={() => scrollToElement('work')}
            className={styles.link}
          >
            Преимущества работы с нами
          </button>
          <button
            onClick={() => scrollToElement('app')}
            className={styles.link}
          >
            Мобильное приложение
          </button>
          <button
            onClick={() => scrollToElement('cost')}
            className={styles.link}
          >
            Стоимость
          </button>
          <button
            onClick={() => scrollToElement('cases')}
            className={styles.link}
          >
            Кейсы
          </button>

          <p className={styles.info}>Время работы: </p>
          <p className={styles.info}>пн-пт 10:00-20:00</p>
          <a href='tel:+74997556677' className={styles.link}>
            8 (499) 755-66-77
          </a>
          <p className={styles.info}>royalmarketing@info</p>
        </div>
        <button
          className={styles.demoButton}
          onClick={() => setIsModalOpen(true)}
        >
          <p className={styles.textButton}>{buttonTitle}</p>
          <img
            src={ArrowUpRightBlackIcon}
            alt='Arrow Icon'
            className={styles.arrow}
          />
        </button>

        <div className={styles.bottomParagraphMobile}>
          <p className={styles.bottomParagraph}>
            ООО "Ройл Софт". Юридический адрес: 141420, Московская область, г
            Химки, мкр. Сходня, ул. Некрасова п. 2 стр. 77, офис 300. ОГРН:
            124500051988 от 23 апреля 2024 г. ИНН/КПП: 5047292421/504701001.
          </p>
          <a
            href='/privacy-policy'
            target='_blank'
            className={styles.privacyPolicy}
          >
            Политика конфиденциальности
          </a>
        </div>
      </section>
      <div className={styles.bottomWrapper}>
        <p className={styles.bottomParagraph}>
          ООО "Ройл Софт". Юридический адрес: 141420, Московская область, г
          Химки, мкр. Сходня, ул. Некрасова п. 2 стр. 77, офис 300. ОГРН:
          124500051988 от 23 апреля 2024 г. ИНН/КПП: 5047292421/504701001.
          <a href='#' target='_blank' className={styles.privacyPolicy}>
            Политика конфиденциальности
          </a>
        </p>
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonTitle={buttonTitle}
      />
    </footer>
  )
}
