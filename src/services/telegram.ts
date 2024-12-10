interface IFormattedData {
  title: string
  source?: string
  details: {
    name: string
    phone: string
    selectedDate: string
  }
}

const BOT_TOKEN = '7616359150:AAF1184fwHDd5_H87SPOBjM1WccLfYmTjWE'
const CHANNEL_ID = '-1002350677578'

const formatTelegramMessage = (data: IFormattedData): string => {
  const { title, source, details } = data
  const { name, phone, selectedDate } = details

  return `
  ${title}
  
  Имя: ${name}
  Телефон: ${phone}
  ${selectedDate ? `Удобное время: ${selectedDate}` : ''}
  Источник: ${source || 'Не указан'}
    `.trim()
}

export const sendToTelegram = async (data: IFormattedData): Promise<void> => {
  try {
    const message = formatTelegramMessage(data)

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to send message')
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error)
    throw error
  }
}
