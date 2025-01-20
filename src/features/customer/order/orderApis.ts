import { AxiosClient } from 'apis/axiosClient'
import axios from 'axios'

export interface IQuery {
  query: string
}

export const orderServices = {
  getProvince: async (params: IQuery) => {
    try {
      const url = 'https://open.oapi.vn/location/provinces'
      const response = await axios.get(url, {
        params: {
          size: 999,
          query: params.query || ''
        }
      })
      return response.data // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching provinces:', error)
      throw error // Ném lỗi ra ngoài để xử lý
    }
  },
  getDistrict: async (provinceId: string) => {
    try {
      const url = `https://open.oapi.vn/location/districts/${provinceId}`
      const response = await axios.get(url, {
        params: {
          size: 999
        }
      })
      return response.data // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching provinces:', error)
      throw error // Ném lỗi ra ngoài để xử lý
    }
  },
  getWards: async (districtId: string) => {
    try {
      const url = `https://open.oapi.vn/location/wards/${districtId}`
      const response = await axios.get(url, {
        params: {
          size: 999
        }
      })
      return response.data // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error fetching provinces:', error)
      throw error // Ném lỗi ra ngoài để xử lý
    }
  },
  createOrder: (payload: any) => {
    const url = `/order`
    return AxiosClient.post(url, { ...payload })
  }
}
