import React from 'react'
import { useForm } from 'react-hook-form'
import { RedButton } from '@shared/red-button/RedButton'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import {
  NameInput,
  PhoneInput,
  AnimatedCheckbox
} from '@shared/form-elements/FormElements'
import { DateTimeModal } from '@shared/date-time-modal/DateTimeModal'
import { sendToTelegram } from '../../services/telegram'

import styles from './ConnectFormBlock.module.scss'

interface IFormInputs {
  name: string
  phone: string
  agreement: boolean
  selectedDate?: Date
}

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

export const ConnectFormBlock: React.FC = () => {
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<IFormInputs | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const subtitleRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const formTitleRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      phone: '',
      agreement: false
    }
  })

  const onSubmit = (data: IFormInputs) => {
    setFormData(data)
    setIsDateTimeModalOpen(true)
  }

  const handleDateTimeConfirm = async (date: Date) => {
    if (formData) {
      try {
        setIsSubmitting(true)

        const formattedData = {
          title: 'Новая заявка',
          source: 'Форма связи',
          details: {
            name: formData.name,
            phone: formData.phone,
            selectedDate: formatDateTime(date)
          }
        }

        await sendToTelegram(formattedData)

        setIsDateTimeModalOpen(false)
        setFormData(null)
        reset({
          name: '',
          phone: '',
          agreement: false
        })
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleModalClose = () => {
    setIsDateTimeModalOpen(false)
    setFormData(null)
    reset({
      name: '',
      phone: '',
      agreement: false
    })
  }

  return (
    <div className={styles.wrapper} id='connect'>
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p
            ref={(el) => el && formTitleRef.current.push(el)}
            className={styles.formTitle}
          >
            Получите индивидуальный маркетплейс, под ключ с неповторимым
            дизайном, быстрее и дешевле шаблонного варианта
          </p>
          <NameInput
            registration={register('name', {
              required: 'Введите имя'
            })}
            error={errors.name}
            animate={true}
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
            animate={true}
          />
          <RedButton
            text='Выбрать удобное время'
            animate={true}
            type='submit'
          />
          <AnimatedCheckbox
            registration={register('agreement', {
              required: 'Необходимо согласие на обработку данных'
            })}
            error={errors.agreement}
            label='Я согласен на обработку персональных данных'
            animate={true}
          />
        </form>
      </div>

      <DateTimeModal
        isOpen={isDateTimeModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDateTimeConfirm}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
