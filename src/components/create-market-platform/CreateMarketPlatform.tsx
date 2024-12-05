import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import PlatformFirstIcon from '@assets/icons/platform-first.svg'
import PlatformSecondIcon from '@assets/icons/platform-second.svg'
import PlatformThirdIcon from '@assets/icons/platform-third.svg'
import PlatformForthIcon from '@assets/icons/platform-forth.svg'
import PlatformFifthIcon from '@assets/icons/platform-fifth.svg'

import styles from './CreateMarketPlatform.module.scss'

export const CreateMarketPlatform: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const elementsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <div className={styles.container}>
      <div className={styles.features}>
        <h2
          ref={(el) => el && headerRef.current.push(el)}
          className={`${styles.header}`}
        >
          Платформа Royal Soft обеспечивает вам ежедневный рост вашего дохода и
          оборота
        </h2>
        {[
          {
            icon: PlatformThirdIcon,
            title: 'Масштабируйте бизнес',
            description:
              'Забудьте о поиске инвестиций и увеличении расходов на расширение и штат сотрудников. Разверните платформу маркетплейса от Royal Soft и растите с нами.'
          },
          {
            icon: PlatformFirstIcon,
            title: 'Повышайте средний чек',
            description:
              'Промо-акции, программы лояльности, кросс-сейлы - легко настраиваются на платформе за считанные минуты.'
          },
          {
            icon: PlatformForthIcon,
            title: 'Увеличивайте охват и географию',
            description:
              'Ваши клиенты могут совершать покупки круглосуточно и по всей стране, без ограничений и вашего участия.'
          },
          {
            icon: PlatformSecondIcon,
            title: 'Расширяйте возможности без вложений',
            description:
              'Продавайте без затрат на складирование, раздутого штата сотрудников и кредитов.'
          },
          {
            icon: PlatformFifthIcon,
            title: 'Управляйте бизнесом из любой точки мира',
            description:
              'Всё, что вам нужно - телефон. Развивайте маркетплейс в удобное время без привязки к месту, откуда угодно.'
          }
        ].map((feature, index) => (
          <div
            key={index}
            ref={(el) => (elementsRef.current[index] = el!)}
            className={styles.feature}
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className={styles.icon}
            />
            <div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
