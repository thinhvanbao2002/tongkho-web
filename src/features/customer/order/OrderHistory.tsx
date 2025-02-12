/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import './orderHistory.css'
import { orderServices } from './orderApis'
import { formatDate, formatPrice, openNotification, openNotificationError, vldOrderStatus } from 'common/utils'
import { ORDER_TYPE } from 'common/constants/constants'
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

  return (
    <>
      <div className='customer-order'>
        <div className='content-customer-order'>
          <div className='content-customer-order-list'>
            {orders &&
              orders.length > 0 &&
              orders.map((item, index) => (
                <div key={`${index}-${item.id}`} className='order-list-item'>
                  <div className='order-list-item-header'>
                    <h4 className='item-order-code'>
                      Mã đơn hàng: <span style={{ color: '#ee4d2d' }}>{item?.id}</span>
                    </h4>
                    <h4 className='item-order-status'>{vldOrderStatus(item.order_status)}</h4>
                  </div>
                  <div className='order-list-item-products text-custom-sm'>
                    {item.order_details.map((od: any, index: number) => (
                      <div key={`${index}-${od.id}`} className='order-item-product'>
                        <div className='order-item-product-info text-custom-sm uppercase w-[40%]'>
                          <img src={od.product?.image} alt='' />
                          <p>{od.product?.name}</p>
                        </div>
                        <p className='order-item-product-quantity'>x {od.product_number}</p>
                        <span style={{ color: '#ee4d2d' }}>{formatPrice(od.product?.price)} VNĐ</span>
                      </div>
                    ))}
                  </div>
                  <div className='order-list-item-footer text-custom-sm'>
                    <div className='flex items-center'>
                      <h3>Ngày đặt hàng: </h3>
                      <span className='text-money'>{formatDate(item.created_at)}</span>
                    </div>
                    <div className='flex items-center'>
                      <h3>
                        Tổng thanh toán:{' '}
                        <span className='text-money text-custom-xl'>{formatPrice(item.total_price)}</span>
                      </h3>
                      <button
                        onClick={() => {
                          if (
                            ![
                              ORDER_TYPE.WAITING_FOR_PAYMENT,
                              ORDER_TYPE.WAITING_FOR_PAYMENT,
                              ORDER_TYPE.CANCELED,
                              ORDER_TYPE.PAID
                            ].includes(item.order_status)
                          ) {
                            setDeleteModalVisible(true)
                            setOrderId(item.id)
                          }
                        }}
                        className={`item-order-cancel-btn ml-10 transform transition-all
                          ${
                            [
                              ORDER_TYPE.WAITING_FOR_PAYMENT,
                              ORDER_TYPE.WAITING_FOR_PAYMENT,
                              ORDER_TYPE.CANCELED,
                              ORDER_TYPE.PAID
                            ].includes(item.order_status)
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'cursor-pointer hover:bg-money hover:text-while hover:'
                          }
                          `}
                      >
                        Hủy đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>Xác nhận hủy</span>
          </div>
        }
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <button
            key='cancel'
            onClick={() => {
              setDeleteModalVisible(false)
              setOrderId(null)
            }}
            className='px-4 py-2 border rounded-md bg-gray-200 hover:bg-money transition'
          >
            Hủy bỏ
          </button>,
          <button
            key='confirm'
            onClick={() => {
              handleCancelOrder(orderId)
              setOrderId(null)
            }} // Thay bằng function hủy đơn hàng của bạn
            className='px-4 py-2 ml-2 border rounded-md bg-red-500 text-white transition hover:bg-money'
          >
            Xác nhận
          </button>
        ]}
        centered
      >
        <p style={{ fontSize: '18px', textAlign: 'center' }}>Bạn có chắc chắn muốn hủy đơn hàng?</p>
      </Modal>
    </>
  )
}

export default OrderHistory
