import React from 'react'
import { useForm } from 'react-hook-form'
import {
  NameInput,
  PhoneInput,
  AnimatedCheckbox
} from '@shared/form-elements/FormElements'
import { DateTimeModal } from '@shared/date-time-modal/DateTimeModal'
import { sendToTelegram } from '@services/telegram'
import { ModalPortal } from '@shared/modal-portal/ModalPortal'
import calendar from '@assets/icons/calendar.svg'
import closeModal from '@assets/icons/close-modal.svg'

import styles from './FormModal.module.scss'

interface IFormInputs {
  name: string
  phone: string
  agreement: boolean
}

interface IFormModalProps {
  isOpen: boolean
  onClose: () => void
  buttonTitle?: string
}

export const FormModal: React.FC<IFormModalProps> = ({
  isOpen,
  onClose,
  buttonTitle
}) => {
  const [view, setView] = React.useState<'form' | 'datetime'>('form')
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | null>(
    null
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [dateError, setDateError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      phone: '',
      agreement: true
    }
  })

  React.useEffect(() => {
    if (!isOpen) {
      reset()
      setSelectedDateTime(null)
      setDateError(null)
      setView('form')
    }
  }, [isOpen, reset])

  const formatDateTime = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('ru', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formatter.format(date)
  }

  const handleCalendarClick = () => {
    setView('datetime')
    setDateError(null)
  }

  const handleDateTimeConfirm = (date: Date) => {
    setSelectedDateTime(date)
    setDateError(null)
    setView('form')
  }

  const handleFormCancel = () => {
    reset()
    setSelectedDateTime(null)
    setDateError(null)
    setView('form')
    onClose()
  }

  const validateForm = async () => {
    if (!selectedDateTime) {
      setDateError('Выберите дату и время встречи')
      return false
    }

    const isValid = await trigger()
    return isValid
  }

  const onSubmit = async (data: IFormInputs) => {
    const isValid = await validateForm()
    if (!isValid) return

    try {
      setIsSubmitting(true)

      const formattedData = {
        title: 'Новая заявка',
        source: buttonTitle,
        details: {
          name: data.name,
          phone: data.phone,
          selectedDate: formatDateTime(selectedDateTime!)
        }
      }

      await sendToTelegram(formattedData)
      onClose()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const renderMainForm = () => (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.modalClose} onClick={onClose}>
          <img src={closeModal} alt='close modal' />
        </button>

        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>
            Заполните данные, чтобы получить демо-версию сервиса и рассчитать
            точную стоимость реализации вашего маркетплейса
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <NameInput
              registration={register('name', {
                required: 'Введите имя'
              })}
              error={errors.name}
              animate={false}
            />

            <PhoneInput
              registration={register('phone', {
                required: 'Введите номер телефона',
                validate: (value) => {
                  if (!value || value === '+7 ') return 'Введите номер телефона'
                  if (value.replace(/\D/g, '').length < 11)
                    return 'Введите корректный номер телефона'
                  return true
                }
              })}
              error={errors.phone}
              animate={false}
            />

            <div
              className={`${styles.calendarLink} ${dateError ? styles.error : ''}`}
              onClick={handleCalendarClick}
            >
              <div className={styles.calendarWrapper}>
                <img
                  src={calendar}
                  alt='calendar'
                  className={styles.calendarIcon}
                />
                <span className={styles.calendarText}>
                  {selectedDateTime
                    ? `Выбрано: ${formatDateTime(selectedDateTime)}`
                    : 'Согласовать онлайн-встречу с менеджером'}
                </span>
              </div>
              {dateError && (
                <div className={styles.errorMessage}>{dateError}</div>
              )}
            </div>

            <button
              className={styles.submitButton}
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
            </button>

            <AnimatedCheckbox
              registration={register('agreement', {
                required: 'Необходимо согласие на обработку данных'
              })}
              error={errors.agreement}
              label='Я согласен на обработку персональных данных'
              animate={false}
            />
          </form>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (view === 'datetime') {
      return (
        <DateTimeModal
          isOpen={true}
          onClose={() => setView('form')}
          onConfirm={handleDateTimeConfirm}
          onCancel={handleFormCancel}
          initialDate={selectedDateTime}
        />
      )
    }
    return renderMainForm()
  }

  return <ModalPortal isOpen={isOpen}>{renderContent()}</ModalPortal>
}
