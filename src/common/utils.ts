import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const openNotification = (type: NotificationType, title: string, desc: string) => {
  notification[type]({
    message: title,
    description: desc
  })
}
