import React from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import DropdownIcon from '@assets/icons/arrow-dropdown.svg'

import styles from './PlatformDropdownBlock.module.scss'

const data = [
  {
    title: 'Уникальная адаптация и кастомизация',
    description:
      'Все элементы - от функционала до внутренних интеграций с бизнес-процессами - разрабатываются под ваш запрос и особености работы. Наш уровень персонализации нишевых маркетплейсов не имеет аналогов.'
  },
  {
    title: 'Индивидуальный дизайн и стиль',
    description:
      'Ваш маркетплейс не будет похож на решения конкурентов. Мы создаем уникальный дизайн платформы под ваш фирменный стиль, который заметно отличается и привлекает внимание покупателей и продавцов.'
  },
  {
    title: 'Полный контроль и управление',
    description:
      'Вы получаете собственный исходный код, все модули находятся на вашем личном сервере, а наша техническая поддержка работает круглосуточно.'
  },
  {
    title: 'Проверенная эффективность',
    description:
      'Мы быстро вносим точечные изменения в ваш маркетплейс, реагируя на изменения трендов и потребительского поведения, что позволяет вам привлекать клиентов раньше конкурентов.'
  },
  {
    title: 'Мобильное приложение — уникальный канал продаж',
    description:
      'Ваш маркетплейс будет поддерживать продвинутое мобильное приложение с push-уведомлениями, обеспечивая постоянный контакт с покупателями. Приложение автоматически отправит приветствия, напоминания, анонсы акций и обновления ассортимента, помогая удерживать интерес и увеличивать продажи. Его наличие подчеркнёт серьезность и ценность вашего проекта'
  },
  {
    title: 'Круглосуточная техническая поддержка',
    description:
      'Быстро отвечаем на ваши вопросы 24/7, помогаем разобраться с функционалом и развить маркетплейс. Своевременно обновляем сервис для ускорения бизнес процессов и операционных действий. Следим за изменениями в законодательстве и трендами рынка и оперативно добавляем новые модули для роста вашего бизнеса.'
  },
  {
    title: 'Без дополнительных расходов',
    description:
      'Вы получаете полноценный маркетплейс с полным функционалом без необходимости докупать модули позже. Финальная стоимость вашего маркетплейса известна с самого начала — никаких сюрпризов!'
  },
  {
    title: 'Миграция с любой платформы',
    description:
      'Мы оказываем полную поддержку при переходе с других платформ. Наша команда разработчиков сопровождает миграцию на каждом этапе, гарантируя плавный переход и полную адаптацию к новому решению.'
  }
]

export const PlatformDropdownBlock: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const dropdownItemsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.wrapper} id='functions'>
      <div className={styles.headerWrapper}>
        <h2
          ref={(el) => el && headerRef.current.push(el)}
          className={styles.header}
        >
          Платформа Royal Soft это:
        </h2>
      </div>
      <div className={styles.dropdownList}>
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (dropdownItemsRef.current[index] = el!)}
            className={styles.dropdownItem}
          >
            <DropdownItem title={item.title} description={item.description} />
          </div>
        ))}
      </div>
    </div>
  )
}

const DropdownItem: React.FC<{ title: string; description: string }> = ({
  title,
  description
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className={styles.dropdownWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles.dropdownHeader}>
        <span className={styles.title}>{title}</span>
        <img
          src={DropdownIcon}
          alt='Dropdown Icon'
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
        />
      </div>
      <p
        className={`${styles.description} ${isOpen ? styles.descriptionOpen : ''}`}
      >
        {description}
      </p>
    </div>
  )
}
