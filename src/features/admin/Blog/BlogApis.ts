import { handleObjectEmpty } from 'common/utils'
import { AxiosClient } from '../../../apis/axiosClient'
import { RECORD_SIZE } from 'common/config'
import { IBlog } from './Blog.props'

export interface IQuery {
  page: number
}

export const blogServices = {
  get: (params: IQuery) => {
    const url = '/a/blog'
    const handleParams = handleObjectEmpty(params)
    return AxiosClient.get(url, {
      params: { ...handleParams, limit: RECORD_SIZE }
    })
  },
  post: (value: IBlog) => {
    const url = '/a/blog'
    return AxiosClient.post(url, {
      ...value
    })
  },
  put: (value: IBlog) => {
    const url = `/a/blog/${value?.id}`
    return AxiosClient.put(url, {
      ...value
    })
  },
  delete: (id: number) => {
    const url = `/a/blog/${id}`
    return AxiosClient.delete(url)
  }
}
