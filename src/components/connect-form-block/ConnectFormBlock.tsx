import React from 'react'
import { RedButton } from '@shared/red-button/RedButton'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

import styles from './ConnectFormBlock.module.scss'

export const ConnectFormBlock: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const subtitleRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const formTitleRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const inputRefs = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const checkboxRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [isAgreed, setIsAgreed] = React.useState(false)

  const formatPhone = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 11)
    if (!digits) return ''

    let formatted = '+7 '
    if (digits.length > 1) {
      formatted += `(${digits.slice(1, 4)}`
    }
    if (digits.length >= 5) {
      formatted += `) ${digits.slice(4, 7)}`
    }
    if (digits.length >= 8) {
      formatted += `-${digits.slice(7, 9)}`
    }
    if (digits.length >= 10) {
      formatted += `-${digits.slice(9, 11)}`
    }
    return formatted
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setPhone(formatPhone(input))
  }

  const handlePhoneFocus = () => {
    if (!phone) {
      setPhone('+7 ')
    }
  }

  const handlePhoneBlur = () => {
    if (phone === '+7 ') {
      setPhone('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, phone, isAgreed })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftColumn}>
        <h2
          ref={(el) => el && headerRef.current.push(el)}
          className={styles.header}
        >
          Мы обеспечим обучение и сопровождение на каждом этапе создания и
          управления маркетплейсом
        </h2>
        <p
          ref={(el) => el && subtitleRef.current.push(el)}
          className={styles.subtitle}
        >
          - от реализации вашей идеи до оформления первых заказов и эффективного
          взаимодействия с продавцами и покупателями
        </p>
      </div>
      <div className={styles.rightColumn}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <p
            ref={(el) => el && formTitleRef.current.push(el)}
            className={styles.formTitle}
          >
            Получите индивидуальный маркетплейс, под ключ с неповторимым
            дизайном, быстрее и дешевле шаблонного варианта
          </p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Имя'
            ref={(el) => el && inputRefs.current.push(el)}
            className={styles.input}
          />
          <input
            type='tel'
            value={phone}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            onChange={handlePhoneChange}
            placeholder='Телефон'
            ref={(el) => el && inputRefs.current.push(el)}
            className={styles.input}
          />
          <RedButton text='Выбрать удобное время' animate={true} />
          <label
            ref={(el) => el && checkboxRef.current.push(el)}
            className={styles.checkboxLabel}
          >
            <input
              type='checkbox'
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.customCheckbox}></span>
            <p className={styles.customCheckboxTitle}>
              Я согласен на обработку персональных данных
            </p>
          </label>
        </form>
      </div>
    </div>
  )
}
