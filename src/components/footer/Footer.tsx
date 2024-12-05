import RoyalIcon from '@assets/icons/royal-logo.svg'
import ArrowUpRightBlackIcon from '@assets/icons/arrow-up-right-black.svg'
import TelegramIcon from '@assets/icons/telegram-icon.svg'

import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.desctopBlock}>
        <div className={styles.logoNavWrapper}>
          <img src={RoyalIcon} alt='Royal logo' className={styles.logo} />
          <nav className={styles.linksWrapper}>
            <a href='#work' className={styles.link}>
              Преимущества работы с нами
            </a>
            <a href='#app' className={styles.link}>
              Мобильное приложение
            </a>
            <a href='#cost' className={styles.link}>
              Стоимость
            </a>
            <a href='#cases' className={styles.link}>
              Кейсы
            </a>
          </nav>
        </div>
        <div className={styles.infoButtonsWrapper}>
          <div className={styles.infoWrapper}>
            <p className={styles.info}>Время работы: </p>
            <p className={styles.info}>пн-пт 10-20:00</p>
            <p className={styles.info}>8 (499) 755-66-77</p>
            <p className={styles.info}>royalmarketing@info</p>
          </div>
          <div className={styles.buttonsWrapper}>
            <a href='#tglink' target='_blank' className={styles.telegramLink}>
              <img src={TelegramIcon} alt='telegram' />
            </a>
            <button className={styles.demoButton}>
              <p className={styles.textButton}>Посмотреть демо</p>
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
          <a href='#tglink' target='_blank' className={styles.telegramLink}>
            <img src={TelegramIcon} alt='telegram' />
          </a>
        </div>
        <div className={styles.infoMobileWrapper}>
          <a href='#work' className={styles.link}>
            Преимущества работы с нами
          </a>
          <a href='#app' className={styles.link}>
            Мобильное приложение
          </a>
          <a href='#cost' className={styles.link}>
            Стоимость
          </a>
          <a href='#cases' className={styles.link}>
            Кейсы
          </a>

          <p className={styles.info}>Время работы: </p>
          <p className={styles.info}>пн-пт 10-20:00</p>
          <p className={styles.info}>8 (499) 755-66-77</p>
          <p className={styles.info}>royalmarketing@info</p>
        </div>
        <button className={styles.demoButton}>
          <p className={styles.textButton}>Посмотреть демо</p>
          <img
            src={ArrowUpRightBlackIcon}
            alt='Arrow Icon'
            className={styles.arrow}
          />
        </button>
        <div className={styles.bottomParagraphMobile}>
          <p className={styles.bottomParagraph}>
            ООО “Ройл Софт”. Юридический адрес: 141420, Московская область, г
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
          ООО “Ройл Софт”. Юридический адрес: 141420, Московская область, г
          Химки, мкр. Сходня, ул. Некрасова п. 2 стр. 77, офис 300. ОГРН:
          124500051988 от 23 апреля 2024 г. ИНН/КПП: 5047292421/504701001.
          <a
            href='/privacy-policy'
            target='_blank'
            className={styles.privacyPolicy}
          >
            Политика конфиденциальности
          </a>
        </p>
      </div>
    </div>
  )
}
