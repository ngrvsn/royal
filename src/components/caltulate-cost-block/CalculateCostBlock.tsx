import React from 'react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { RedButton } from '@shared/red-button/RedButton'
import { FormModal } from '@components/form-modal/FormModal'

import styles from './CalculateCostBlock.module.scss'

export const CalculateCostBlock: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const buttonTitle = 'Получить демо'
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const subtitleRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.wrapper} id='cost'>
      <h2
        ref={(el) => el && headerRef.current.push(el)}
        className={styles.header}
      >
        Вы получите маркетплейс с полным функционалом сразу, без необходимости
        докупки дополнительных модулей в будущем. Это отличает нас от других
        коробочных решений на рынке.
      </h2>
      <div className={styles.buttonSubtitleWrapper}>
        <h3
          ref={(el) => el && subtitleRef.current.push(el)}
          className={styles.subtitle}
        >
          Узнайте финальную стоимость вашего маркетплейса — получите четкую цену
          без доплат и скрытых платежей уже сейчас!
        </h3>
        <RedButton
          text={buttonTitle}
          onClick={() => setIsModalOpen(true)}
          animate={true}
        />
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          buttonTitle={buttonTitle}
        />
      </div>
    </div>
  )
}
