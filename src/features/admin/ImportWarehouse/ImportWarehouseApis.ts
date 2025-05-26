import { handleObjectEmpty } from 'common/utils'
import { AxiosClient } from '../../../apis/axiosClient'
import { RECORD_SIZE } from 'common/config'
import { IImportWarehouse, IPayLoadListImportWarehouse } from './ImportWarehouse.props'

export const importWarehouseServices = {
  get: (params: IPayLoadListImportWarehouse) => {
    const url = '/a/import-warehouse'
    const handleParams = handleObjectEmpty(params)
    return AxiosClient.get(url, {
      params: { ...handleParams, limit: RECORD_SIZE }
    })
  },
  post: (payload: IImportWarehouse) => {
    const url = '/a/import-warehouse'
    return AxiosClient.post(url, {
      ...payload
    })
  }
}
