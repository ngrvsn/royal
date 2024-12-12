import React from 'react'
import { useForm } from 'react-hook-form'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import styles from './DateTimeModal.module.scss'

interface IDateTimeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (date: Date) => void
  onCancel?: () => void
  isSubmitting?: boolean
  initialDate?: Date | null
}

interface ITimeFormInputs {
  hours: string
  minutes: string
}

export const DateTimeModal: React.FC<IDateTimeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  isSubmitting = false,
  initialDate
}) => {
  const [selectedDate, setSelectedDate] = React.useState(
    initialDate || new Date()
  )

  const {
    register,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<ITimeFormInputs>({
    mode: 'onChange'
  })

  React.useEffect(() => {
    if (initialDate) {
      setValue('hours', initialDate.getHours().toString().padStart(2, '0'))
      setValue('minutes', initialDate.getMinutes().toString().padStart(2, '0'))
    }
  }, [initialDate, setValue])

  React.useEffect(() => {
    if (!isOpen) {
      if (!initialDate) {
        setSelectedDate(new Date())
      }
      reset()
      clearErrors()
    }
  }, [isOpen, reset, clearErrors, initialDate])

  if (!isOpen) return null

  const validateTime = (hours: string, minutes: string) => {
    const hoursNum = parseInt(hours)
    const minutesNum = parseInt(minutes)
    const time = hoursNum * 60 + minutesNum
    const startTime = 10 * 60
    const endTime = 20 * 60
    return time >= startTime && time <= endTime
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleCalendarChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value)
    }
  }

  const formatTimeValue = (value: string) => value.padStart(2, '0')

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors()
    let value = e.target.value.replace(/\D/g, '')

    setValue('hours', value)

    if (value.length === 2) {
      const num = parseInt(value)
      if (num < 10) {
        setValue('hours', '10')
      } else if (num > 20) {
        setValue('hours', '20')
      }
      const minutesInput = document.querySelector<HTMLInputElement>(
        'input[name="minutes"]'
      )
      minutesInput?.focus()
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors()
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 0) {
      const num = parseInt(value)
      if (num > 59) {
        value = '59'
      }
      const hours = watch('hours')
      if (hours === '20' && num > 0) {
        value = '00'
      }
    }

    setValue('minutes', value)
  }

  const validateAndShowError = () => {
    const hours = watch('hours')
    const minutes = watch('minutes')

    if (!hours && !minutes) {
      setError('hours', {
        type: 'required',
        message: 'Выберите время'
      })
      return false
    }

    if (!hours || !minutes) {
      setError('hours', {
        type: 'required',
        message: 'Выберите время'
      })
      return false
    }

    if (!validateTime(hours, minutes)) {
      setError('hours', {
        type: 'validate',
        message: 'Выберите время с 10:00 до 20:00'
      })
      return false
    }

    return true
  }

  const handleConfirm = () => {
    if (!validateAndShowError()) {
      return
    }

    const hours = watch('hours')
    const minutes = watch('minutes')

    const finalDate = new Date(selectedDate)
    finalDate.setHours(parseInt(formatTimeValue(hours)))
    finalDate.setMinutes(parseInt(formatTimeValue(minutes)))
    finalDate.setSeconds(0)
    finalDate.setMilliseconds(0)

    onConfirm(finalDate)
    reset()
    clearErrors()
  }

  const tileDisabled = ({ date }: { date: Date }) => {
    return date.getDay() === 0 || date.getDay() === 6
  }

  const hasError = errors.hours || errors.minutes
  const errorMessage = errors.hours?.message || ''

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.content}>
          <div className={styles.calendarSection}>
            <h3 className={styles.header}>Выберите удобную дату</h3>
            <div className={styles.calendar}>
              <Calendar
                onChange={handleCalendarChange}
                value={selectedDate}
                minDate={new Date()}
                locale='ru-RU'
                selectRange={false}
                tileDisabled={tileDisabled}
              />
            </div>
          </div>

          <div className={styles.timeSection}>
            <p className={styles.subtitle}>Введите время с 10:00 до 20:00</p>
            <form className={styles.timePicker}>
              <div
                className={`${styles.timeInputs} ${hasError ? styles.error : ''}`}
              >
                <input
                  type='text'
                  placeholder='00'
                  maxLength={2}
                  inputMode='numeric'
                  {...register('hours')}
                  onChange={handleHoursChange}
                />
                <span className={styles.separator}>:</span>
                <input
                  type='text'
                  placeholder='00'
                  maxLength={2}
                  inputMode='numeric'
                  {...register('minutes')}
                  onChange={handleMinutesChange}
                />
              </div>
              {errorMessage && (
                <div className={`${styles.errorMessage} ${styles.visible}`}>
                  {errorMessage}
                </div>
              )}
            </form>
          </div>

          <div className={styles.buttons}>
            <button
              type='button'
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={() => (onCancel ? onCancel() : onClose())}
            >
              Отмена
            </button>
            <button
              type='button'
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
