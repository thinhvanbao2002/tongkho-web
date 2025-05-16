/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select, Empty, InputNumber } from 'antd'
import CustomButton from 'common/components/button/Button'
import { formatPrice, openNotification, openNotificationError } from 'common/utils'
import { useCallback, useEffect, useState } from 'react'
import { cartServices } from './cartApis'
import { useNavigate } from 'react-router'
import { USER_PATH } from 'common/constants/paths'
import { TagOutlined } from '@ant-design/icons'

function CartPage() {
  const navigate = useNavigate()
  const [cartId, setCartId] = useState<number>()
  const [carts, setCarts] = useState<any>([])
  console.log('🚀 ~ CartPage ~ carts:', carts)
  const [totalPrice, setTotalPrice] = useState(0)
  console.log('🚀 ~ CartPage ~ totalPrice:', totalPrice)
  const [cartPayload, setCartPayload] = useState<any>({})

  const handleGetAllCart = useCallback(async () => {
    try {
      const res = await cartServices.get()
      if (res) {
        setCarts(res?.data)
      }
    } catch (error) {
      openNotificationError(error)
    }
  }, [])

  const handleDeleteCart = useCallback(async (cartId: number) => {
    try {
      const res = await cartServices.delete(cartId)
      if (res) {
        openNotification('success', 'Thành công', 'Xóa sản phẩm trong giỏ hàng thành công!')
        handleGetAllCart()
      }
    } catch (error) {
      openNotificationError(error)
    }
  }, [])

  const handleCalculateTheTotalAmount = useCallback(() => {
    try {
      if (carts && carts.length) {
        const totalAmount = carts.reduce((acc: number, item: any) => {
          const price = Number(item.product?.price) || 0
          const quantity = item.product_number || 0
          const discount = quantity >= 10 ? 0.2 : 0
          const itemTotal = price * quantity * (1 - discount)
          return acc + itemTotal
        }, 0)

        setTotalPrice(totalAmount)
      } else {
        setTotalPrice(0)
      }
    } catch (error) {
      console.log('🚀 ~ handleCalculateTheTotalAmount ~ error:', error)
    }
  }, [carts])

  const handleUpdateQuantity = async (cartId: number, newQuantity: number, productPrice: number) => {
    try {
      const price = Number(productPrice)
      const discount = newQuantity >= 10 ? 0.2 : 0 // 20% discount for bulk orders
      const newTotalPrice = price * newQuantity * (1 - discount)

      await cartServices.update(cartId, {
        product_number: newQuantity,
        total_price: newTotalPrice
      })

      handleGetAllCart()
    } catch (error) {
      openNotificationError(error)
    }
  }

  useEffect(() => {
    handleGetAllCart()
  }, [])

  useEffect(() => {
    handleCalculateTheTotalAmount()
  }, [carts])

  return (
    <>
      <div className='w-full h-[50px] pl-20 pr-20'>
        <div className='w-full border-b-2 h-[50px] flex items-center justify-start text-custom-sm'>
          <span>Giỏ hàng</span>
          <div className='border-r-2 border-border-basic ml-2 mr-2 w-[1px] h-[16px]'></div>
          <span className='font-semibold'>Thông tin giỏ hàng</span>
        </div>
      </div>
      <div className='w-full pl-20 pr-20 pt-10 pb-20 flex flex-col'>
        <div className='p-6 w-full'>
          <div className='flex flex-col w-full'>
            {carts && carts.length > 0 ? (
              carts.map((c: any) => (
                <div className='mb-6 ' key={c.id}>
                  <div className='flex'>
                    <div className='mr-5'>
                      <img className='w-[160px] h-full object-cover' src={c.product?.image} alt='' />
                    </div>
                    <div className='flex flex-col justify-between w-[70%]'>
                      <div>
                        <div>
                          <div>
                            <h2 className='text-custom-sm font-semibold uppercase'>{c?.product?.name}</h2>
                          </div>
                          <div className='flex items-center mt-2'>
                            <span className='text-custom-xs'>Giá:</span>
                            <h3 className='ml-1 text-custom-sm font-semibold'>{formatPrice(c.product?.price)} VND</h3>
                          </div>
                        </div>
                        <div className='flex'>
                          <div className='mr-10'>
                            <div className='text-custom-sm'>Size</div>
                            <div>
                              <Select
                                style={{ width: 100 }}
                                value={c.size}
                                onChange={async (value: string) => {
                                  await cartServices.update(c.id, { size: value })
                                  handleGetAllCart()
                                }}
                                options={[
                                  { value: 's', label: 'S' },
                                  { value: 'm', label: 'M' },
                                  { value: 'l', label: 'L' },
                                  { value: 'xl', label: 'XL' },
                                  { value: '2xl', label: '2XL' }
                                ]}
                              />
                            </div>
                          </div>
                          <div>
                            <div className='text-custom-sm'>Số lượng</div>
                            <div>
                              <InputNumber
                                min={1}
                                value={c.product_number}
                                onChange={async (value: number) => {
                                  if (value && value > 0) {
                                    const price = Number(c.product?.price)
                                    await handleUpdateQuantity(c.id, value, price)
                                  }
                                }}
                                style={{ width: 100 }}
                                controls={true}
                                className='hover:border-black focus:border-black'
                              />
                            </div>
                          </div>
                          {c.product_number >= 10 && <div className='text-xs text-red-500 mt-1'>Mua sỉ - Giảm 20%</div>}
                        </div>
                      </div>
                    </div>
                    <div className='w-[30%] text-right flex flex-col justify-between'>
                      <div>
                        <div>
                          <h2 className='text-custom-xl font-semibold text-money'>
                            {formatPrice(
                              c.product_number >= 10
                                ? c.product?.price * c.product_number * (1 - 0.2)
                                : c.product?.price * c.product_number
                            )}{' '}
                            VND
                          </h2>
                        </div>
                        <div>
                          <span className='text-custom-xs text-money italic'>Còn hàng</span>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            handleDeleteCart(c.id)
                          }}
                          className='pt-2 pb-2 w-[100px] bg-black text-while text-custom-xs rounded-lg hover:text-while hover:bg-money transform transition-all'
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm'>
                <Empty description='Giỏ hàng của bạn đang trống' />
              </div>
            )}
          </div>
        </div>
        <div className='w-full flex justify-center mt-8'>
          <div className='w-full max-w-xl bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold uppercase mb-6 text-center text-money tracking-wider'>
              Thông tin đơn hàng
            </h2>
            <div className='border-t border-gray-200 mb-6'></div>
            <div className='mb-6'>
              <label className='block text-sm font-semibold mb-2 text-gray-700'>Nhập mã khuyến mãi</label>
              <div className='flex gap-2'>
                <input
                  className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-money transition'
                  type='text'
                  placeholder='Nhập mã giảm giá...'
                />
                <button className='bg-money text-white px-6 py-2 rounded-lg font-semibold uppercase hover:bg-green-700 transition'>
                  Áp dụng
                </button>
              </div>
            </div>
            <div className='border-t border-dashed border-gray-300 mb-6'></div>
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-gray-500 font-medium'>Đơn hàng</span>
              <span className='text-lg font-semibold text-gray-700'>{formatPrice(totalPrice)} VNĐ</span>
            </div>
            <div className='border-t border-dashed border-gray-300 mb-6'></div>
            <div className='mb-8 flex items-center justify-between text-xl font-bold'>
              <span className='uppercase'>Tạm tính</span>
              <span className='text-money'>{formatPrice(totalPrice)} VNĐ</span>
            </div>
            <button
              className='w-full bg-money text-white py-4 rounded-xl text-lg font-bold uppercase shadow-md hover:bg-green-700 transition-all duration-200'
              onClick={() => {
                navigate(`${USER_PATH.ORDER}`, { state: { cart: carts } })
              }}
            >
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
