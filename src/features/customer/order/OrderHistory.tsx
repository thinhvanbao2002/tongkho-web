/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import './orderHistory.css'
import { orderServices } from './orderApis'
import { formatDate, formatPrice, openNotification, openNotificationError, vldOrderStatus } from 'common/utils'
import { ORDER_TYPE } from 'common/constants/constants'
import { motion } from 'framer-motion'
import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react'

function OrderHistory() {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [payload, setPayload] = useState<any>({})
  const [orders, setOrders] = useState<Array<any>>([])
  const [orderId, setOrderId] = useState<any>(null)

  const handleGetOrders = useCallback(async (payload: any) => {
    try {
      const res = await orderServices.getOrders(payload)
      if (res) {
        setOrders(res.data)
      }
    } catch (error) {
      console.log('🚀 ~ handleGetOrders ~ error:', error)
    }
  }, [])

  const handleCancelOrder = async (orderId: number) => {
    try {
      const res = await orderServices.cancelOrder(orderId)
      if (res) {
        openNotification('success', 'Thành công', 'Hủy đơn hàng thành công!')
        handleGetOrders(payload)
        setDeleteModalVisible(false)
      }
    } catch (error) {
      openNotificationError(error)
    }
  }

  useEffect(() => {
    handleGetOrders(payload)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case ORDER_TYPE.WAITING_FOR_PAYMENT:
        return <Clock className='w-5 h-5' />
      case ORDER_TYPE.PROCESSING:
        return <Package className='w-5 h-5' />
      case ORDER_TYPE.SHIPPING:
        return <Truck className='w-5 h-5' />
      case ORDER_TYPE.COMPLETED:
        return <CheckCircle className='w-5 h-5' />
      case ORDER_TYPE.CANCELED:
        return <XCircle className='w-5 h-5' />
      default:
        return <Clock className='w-5 h-5' />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case ORDER_TYPE.WAITING_FOR_PAYMENT:
        return 'text-yellow-600 bg-yellow-50'
      case ORDER_TYPE.PROCESSING:
        return 'text-blue-600 bg-blue-50'
      case ORDER_TYPE.SHIPPING:
        return 'text-purple-600 bg-purple-50'
      case ORDER_TYPE.COMPLETED:
        return 'text-green-600 bg-green-50'
      case ORDER_TYPE.CANCELED:
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-4 sm:py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 px-2'>Lịch sử đơn hàng</h1>

        <div className='space-y-4 sm:space-y-6'>
          {orders && orders.length > 0 ? (
            orders.map((item, index) => (
              <motion.div
                key={`${index}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='bg-white rounded-lg shadow-sm overflow-hidden'
              >
                {/* Header */}
                <div className='p-4 sm:p-6 border-b border-gray-100'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'>
                    <div className='flex items-center space-x-3'>
                      <div className={`p-2 rounded-full ${getStatusColor(item.order_status)}`}>
                        {getStatusIcon(item.order_status)}
                      </div>
                      <div>
                        <h3 className='text-base sm:text-lg font-semibold text-gray-900'>Đơn hàng #{item.id}</h3>
                        <p className='text-xs sm:text-sm text-gray-500'>{formatDate(item.created_at)}</p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(item.order_status)}`}
                    >
                      {vldOrderStatus(item.order_status)}
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className='p-4 sm:p-6'>
                  <div className='space-y-4'>
                    {item.order_details.map((od: any, index: number) => (
                      <div
                        key={`${index}-${od.id}`}
                        className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'
                      >
                        <div className='flex items-center space-x-3 sm:space-x-4'>
                          <img
                            src={od.product?.image}
                            alt={od.product?.name}
                            className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg'
                          />
                          <div className='flex-1'>
                            <h4 className='text-sm font-medium text-gray-900 line-clamp-2'>{od.product?.name}</h4>
                            <p className='text-xs sm:text-sm text-gray-500'>Số lượng: {od.product_number}</p>
                          </div>
                        </div>
                        <div className='text-right sm:text-left'>
                          <p className='text-sm font-medium text-gray-900'>{formatPrice(od.product?.price)} VNĐ</p>
                          <p className='text-xs sm:text-sm text-gray-500'>
                            Tổng: {formatPrice(od.product?.price * od.product_number)} VNĐ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className='px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'>
                    <div className='text-xs sm:text-sm text-gray-500'>
                      Tổng thanh toán:
                      <span className='ml-2 text-base sm:text-lg font-bold text-gray-900'>
                        {formatPrice(item.total_price)} VNĐ
                      </span>
                    </div>
                    {![ORDER_TYPE.WAITING_FOR_PAYMENT, ORDER_TYPE.CANCELED, ORDER_TYPE.PAID].includes(
                      item.order_status
                    ) && (
                      <button
                        onClick={() => {
                          setDeleteModalVisible(true)
                          setOrderId(item.id)
                        }}
                        className='w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200'
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className='text-center py-8 sm:py-12'>
              <p className='text-gray-500'>Chưa có đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={
          <div className='flex items-center space-x-2'>
            <XCircle className='w-5 h-5 sm:w-6 sm:h-6 text-red-500' />
            <span className='text-lg sm:text-xl font-semibold'>Xác nhận hủy đơn hàng</span>
          </div>
        }
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <button
            key='cancel'
            onClick={() => {
              setDeleteModalVisible(false)
              setOrderId(null)
            }}
            className='w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200'
          >
            Hủy bỏ
          </button>,
          <button
            key='confirm'
            onClick={() => {
              handleCancelOrder(orderId)
              setOrderId(null)
            }}
            className='w-full sm:w-auto px-4 py-2 ml-0 sm:ml-2 mt-2 sm:mt-0 text-xs sm:text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200'
          >
            Xác nhận hủy
          </button>
        ]}
        centered
        className='sm:max-w-md'
      >
        <p className='text-center text-sm sm:text-base text-gray-600'>
          Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.
        </p>
      </Modal>
    </div>
  )
}

export default OrderHistory
