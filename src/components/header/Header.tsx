import React from 'react'
import { FormModal } from '@components/form-modal/FormModal'
import { useScrollToElement } from '@hooks/useScrollToElement'
import ArrowUpRightIcon from '@assets/icons/arrow-up-right.svg'
import HeaderMobileIcon from '@assets/icons/header-mobile.svg'
import CloseIcon from '@assets/icons/close-icon.svg'

import styles from './Header.module.scss'

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const scrollToElement = useScrollToElement()
  const buttonTitle = 'Демо'

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

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId)
    closeMobileMenu()
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerDesctop}>
        <nav className={styles.nav}>
          <button
            onClick={() => scrollToElement('work')}
            className={styles.link}
          >
            Возможности
          </button>
          <button
            onClick={() => scrollToElement('functions')}
            className={styles.link}
          >
            Функционал
          </button>
          <button
            onClick={() => scrollToElement('cases')}
            className={styles.link}
          >
            Кейсы
          </button>
          <button
            onClick={() => scrollToElement('cost')}
            className={styles.link}
          >
            Цены
          </button>
          <button
            onClick={() => scrollToElement('connect')}
            className={styles.link}
          >
            Контакты
          </button>
        </nav>
        <button
          className={styles.demoButton}
          onClick={() => setIsModalOpen(true)}
        >
          <p className={styles.textButton}>{buttonTitle}</p>
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
              <button
                className={styles.demoButton}
                onClick={() => {
                  setIsModalOpen(true)
                  closeMobileMenu()
                }}
              >
                <p className={styles.textButton}>{buttonTitle}</p>
                <img
                  src={ArrowUpRightIcon}
                  alt='Arrow Icon'
                  className={styles.arrow}
                />
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <button
                onClick={() => handleNavClick('work')}
                className={styles.mobileLink}
              >
                Возможности
              </button>
              <button
                onClick={() => handleNavClick('functions')}
                className={styles.mobileLink}
              >
                Функционал
              </button>
              <button
                onClick={() => handleNavClick('cases')}
                className={styles.mobileLink}
              >
                Кейсы
              </button>
              <button
                onClick={() => handleNavClick('cost')}
                className={styles.mobileLink}
              >
                Цены
              </button>
              <button
                onClick={() => handleNavClick('connect')}
                className={styles.mobileLink}
              >
                Контакты
              </button>
            </nav>
          </div>
        )}
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonTitle={buttonTitle}
      />
    </header>
  )
}
