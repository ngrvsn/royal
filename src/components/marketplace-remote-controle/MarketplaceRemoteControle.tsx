import React from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { CheckCircle } from '@shared/check-circle/CheckCircle'
import { RemotePhone } from '../remote-phone/RemotePhone'

import styles from './MarketplaceRemoteControle.module.scss'

const data = [
  {
    title: 'Контакт с покупателем',
    description:
      'Приветствия, анонсы, напоминания и поздравления, чтобы поддерживать постоянный контакт с покупателями'
  },
  {
    title: 'Рост продаж и выручки',
    description:
      'Уведомления об акциях, распродажах и новинках для увеличения продаж и активации интереса'
  },
  {
    title: 'Постоянные охваты',
    description:
      'Напоминания, чтобы удерживать клиентов и подкреплять их интерес к вашему маркетплейсу'
  },
  {
    title: 'Имидж и вовлеченность',
    description:
      'Наличие приложения подчеркивает серьезность вашего проекта и стремление к развитию и расширению'
  }
]

const leftData = [
  {
    title: 'Продавцы',
    description: 'Контроль, привлечение и мотивация продавцов'
  },

  {
    title: 'Финансы',
    description:
      'Контроль движения средств, деление транзакций, настройка онлайн-кассы'
  },
  {
    title: 'Мобильное приложение',
    description:
      'Уникальный канал продаж, который поможет оставаться на связи с клиентами'
  },
  {
    title: 'Логистика',
    description: 'Выбор способа доставки и связь с перевозчиками'
  },

  {
    title: 'Уведомления и push',
    description: 'Настройка e-mail и telegram-сообщений'
  }
]

const rightData = [
  {
    title: 'Аналитика',
    description: 'Анализ эффективности всех бизнес-процессов'
  },
  {
    title: 'Безопасность',
    description: 'Автопроверка серверов на предмет банкротства и мошенничества'
  },
  {
    title: 'Маркетинг и АвтоSEO',
    description:
      'Автоматический рост рейтинга и популярности платформы в поисковой выдаче'
  },

  {
    title: 'WEB Api',
    description: 'Свободная интеграция со всеми сервисами и платформами'
  },
  { title: 'Продукт', description: 'Описание, условия, каталог, учет' }
]

export const MarketplaceRemoteControle: React.FC = () => {
  const [animationStage, setAnimationStage] = React.useState(0)
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const boxRefs = useIntersectionObserver({
    onEnter: (entry) => {
      if (animationStage === 2) {
        entry.target.classList.add(styles.visible)
      }
    }
  })

  const rowRefs = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <h2
          ref={(el) => el && headerRef.current.push(el)}
          className={styles.header}
        >
          Пульт управления маркетплейсом:
        </h2>
      </div>
      <div className={styles.controlSection}>
        <div className={styles.controlColumn}>
          {leftData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (boxRefs.current[index] = el!)}
              className={styles.box}
            >
              <h3 className={styles.controlTitle}>{item.title}</h3>
              <p className={styles.controlDescription}>{item.description}</p>
            </div>
          ))}
        </div>
        <RemotePhone onAnimationsComplete={setAnimationStage} />
        <div className={styles.controlColumn}>
          {rightData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (boxRefs.current[leftData.length + index] = el!)}
              className={styles.box}
            >
              <h3 className={styles.controlTitle}>{item.title}</h3>
              <p className={styles.controlDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.secondHeaderWrapper}>
          <h2
            ref={(el) => el && headerRef.current.push(el)}
            className={styles.header}
          >
            Продвинутое мобильное приложение вашего маркетплейса c
            push-уведомлениями - уникальный канал продаж, который позволит вам
            быть всегда на связи с клиентами
          </h2>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (rowRefs.current[index] = el!)}
            className={styles.row}
          >
            <div className={styles.leftColumn}>
              <CheckCircle
                delay={index * 1000}
                id={`circle-marketplace-${index}`}
              />
              <h3 className={styles.subtitle}>{item.title}</h3>
            </div>
            <div className={styles.rightColumn}>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
