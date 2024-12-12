import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { CheckCircle } from '@shared/check-circle/CheckCircle'

import styles from './RealiseIdea.module.scss'

const data = [
  {
    title: 'Круглосуточная поддержка 24/7',
    description:
      'Мы всегда на связи и готовы ответить на любые вопросы. Никаких ограничений на количество обращений - ваше спокойствие в наших руках!'
  },
  {
    title: 'Консультации по функционалу и стратегии',
    description:
      'Помогаем с миграцией на нашу платформу, даем советы по оптимизации работы вашего маркетплейса.'
  },
  {
    title: 'Регулярные обновления программного обеспечения',
    description:
      'Постоянно актуализируем платформу, упрощая сотрудничество, ускоряя бизнес-процессы и улучшая управление.'
  },
  {
    title: 'Индивидуальные обновления по вашим требованиям',
    description:
      'Быстро реагируем на изменения в законодательстве, рыночные тренды и потребности ваших клиентов, внедряя необходимые функции.'
  },
  {
    title: 'Модули для увеличения конверсии',
    description:
      'Оперативно добавляем решения, которые помогут привлечь новых клиентов и улучшить продвижение вашего маркетплейса.'
  }
]

export const RealiseIdea: React.FC = () => {
  const headerRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  const rowsRef = useIntersectionObserver({
    onEnter: (entry) => entry.target.classList.add(styles.visible)
  })

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2
          ref={(el) => el && headerRef.current.push(el)}
          className={styles.header}
        >
          От реализации вашей идеи до оформления первых заказов и эффективного
          взаимодействия с продавцами и покупателями - мы обеспечим обучение и
          поддержку на каждом этапе
        </h2>
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (rowsRef.current[index] = el!)}
            className={styles.row}
          >
            <div
              className={styles.iconColumn}
              ref={(el) => el && rowsRef.current.push(el)}
            ></div>
            <div className={styles.leftColumn}>
              <CheckCircle delay={index * 800} id={`circle-realise-${index}`} />
              <h3 className={styles.subtitle}>{item.title}</h3>
            </div>
            <div className={styles.rightColumn}>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
