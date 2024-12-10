import React from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

import styles from './FormElements.module.scss'

interface IAnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  registration: UseFormRegisterReturn
  error?: FieldError
  animate?: boolean
}

const AnimatedInput: React.FC<IAnimatedInputProps> = ({
  registration,
  error,
  className = '',
  animate = false,
  ...props
}) => {
  const inputRefs = useIntersectionObserver({
    onEnter: (entry) => animate && entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        {...registration}
        ref={(el) => {
          registration.ref(el)
          if (el && animate) {
            inputRefs.current.push(el)
          }
        }}
        className={`${styles.input} ${error ? styles.error : ''} ${!animate ? styles.visible : ''} ${className}`}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
}

interface NameInputProps {
  registration: UseFormRegisterReturn
  error?: FieldError
  animate?: boolean
}

export const NameInput: React.FC<NameInputProps> = ({
  registration,
  error,
  animate = false
}) => {
  return (
    <AnimatedInput
      type='text'
      placeholder='Имя *'
      registration={registration}
      error={error}
      animate={animate}
    />
  )
}

interface PhoneInputProps {
  registration: UseFormRegisterReturn
  error?: FieldError
  animate?: boolean
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  registration,
  error,
  animate = false
}) => {
  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      e.target.value = '+7 '
    }
  }

  const handlePhoneChange = async (e: { target: any; type?: any }) => {
    const formatted = formatPhone(e.target.value)
    e.target.value = formatted
    return registration.onChange(e)
  }

  const handlePhoneBlur = async (e: { target: any; type?: any }) => {
    if (e.target.value === '+7 ') {
      e.target.value = ''
    }
    return registration.onBlur(e)
  }

  return (
    <AnimatedInput
      type='tel'
      placeholder='Телефон *'
      onFocus={handlePhoneFocus}
      registration={{
        ...registration,
        onChange: handlePhoneChange,
        onBlur: handlePhoneBlur
      }}
      error={error}
      animate={animate}
    />
  )
}

interface AnimatedCheckboxProps {
  registration: UseFormRegisterReturn
  error?: FieldError
  label: string
  animate?: boolean
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  registration,
  error,
  label,
  animate = false
}) => {
  const checkboxRef = useIntersectionObserver({
    onEnter: (entry) => animate && entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.checkboxWrapper}>
      <label
        ref={(el) => el && animate && checkboxRef.current.push(el)}
        className={`${styles.checkboxLabel} ${error ? styles.error : ''} ${!animate ? styles.visible : ''}`}
      >
        <input type='checkbox' {...registration} className={styles.checkbox} />
        <span className={styles.customCheckbox}></span>
        <p className={styles.customCheckboxTitle}>{label} *</p>
      </label>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
}

export const formatPhone = (input: string) => {
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
