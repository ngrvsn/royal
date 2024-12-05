import React from 'react'
import ArrowUpRightIcon from '@assets/icons/arrow-up-right.svg'
import HeaderMobileIcon from '@assets/icons/header-mobile.svg'
import CloseIcon from '@assets/icons/close-icon.svg'

import styles from './Header.module.scss'

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const openMobileMenu = () => {
    setIsClosing(false)
    setMobileMenuOpen(true)
  }

  const closeMobileMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMobileMenuOpen(false)
      setIsClosing(false)
    }, 500)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerDesctop}>
        <nav className={styles.nav}>
          <a href='#features' className={styles.link}>
            Возможности
          </a>
          <a href='#functional' className={styles.link}>
            Функционал
          </a>
          <a href='#cases' className={styles.link}>
            Кейсы
          </a>
          <a href='#prices' className={styles.link}>
            Цены
          </a>
          <a href='#contacts' className={styles.link}>
            Контакты
          </a>
        </nav>
        <button className={styles.demoButton}>
          <p className={styles.textButton}>Демо</p>
          <img
            src={ArrowUpRightIcon}
            alt='Arrow Icon'
            className={styles.arrow}
          />
        </button>
      </div>

      <div className={styles.headerMobile}>
        <img
          src={HeaderMobileIcon}
          alt='Mobile Menu Icon'
          className={styles.mobileIcon}
          onClick={openMobileMenu}
        />
        {isMobileMenuOpen && (
          <div
            className={`${styles.mobileMenu} ${
              isClosing ? styles.closing : styles.active
            }`}
          >
            <div className={styles.mobileElementsWrapper}>
              <img
                src={CloseIcon}
                alt='Close Menu Icon'
                className={styles.closeIcon}
                onClick={closeMobileMenu}
              />
              <button className={styles.demoButton}>
                <p className={styles.textButton}>Демо</p>
                <img
                  src={ArrowUpRightIcon}
                  alt='Arrow Icon'
                  className={styles.arrow}
                />
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <a href='#features' className={styles.mobileLink}>
                Возможности
              </a>
              <a href='#functional' className={styles.mobileLink}>
                Функционал
              </a>
              <a href='#cases' className={styles.mobileLink}>
                Кейсы
              </a>
              <a href='#prices' className={styles.mobileLink}>
                Цены
              </a>
              <a href='#contacts' className={styles.mobileLink}>
                Контакты
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
