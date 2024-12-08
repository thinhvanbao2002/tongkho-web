import { notification } from 'antd'
import Config from './constants/config'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const openNotification = (type: NotificationType, title: string, desc: string) => {
  notification[type]({
    message: title,
    description: desc
  })
}

export const handleObjectEmpty = (obj: any) => {
  const cloneObj = { ...obj }

  // remove key from object value empty
  for (const key in cloneObj) {
    if (Object.prototype.hasOwnProperty.call(cloneObj, key)) {
      const element = cloneObj[key]
      if (element === '' || element === null) delete cloneObj[key]
    }
  }
  return cloneObj
}

export const getDataSource = (data: any, page: number) => {
  return data.map((value: any, index: number) => {
    return {
      ...value,
      key: value.id,
      STT: Config.getIndexTable(page, index),
      textStatus: value.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'
    }
  })
}
