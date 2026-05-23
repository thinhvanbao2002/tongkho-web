/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import CustomButton from 'common/components/button/Button'
import Config from 'common/constants/config'
import { useCallback, useEffect, useState } from 'react'
import { orderServices } from './orderApis'
import { formatPrice, getOptionListSelector, openNotification, openNotificationError } from 'common/utils'
import { useLocation, useNavigate } from 'react-router'
import { USER_PATH } from 'common/constants/paths'

function OrderPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [provinces, setProvinces] = useState<Array<any>>([])
  const [districts, setDistricts] = useState<Array<any>>([])
  const [wards, setWards] = useState<Array<any>>([])
  const [province, setProvince] = useState<string>('')
  const [district, setDistrict] = useState<string>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [payload, setPayload] = useState<any>({
    query: null
  })
  const location = useLocation()
  const { state } = location || {}
  const listOrders = state?.cart || []

  const listProvince = getOptionListSelector(provinces, 'name', 'id')
  const listDistrict = getOptionListSelector(districts, 'name', 'id')
  const listWards = getOptionListSelector(wards, 'name', 'id')

  const getProvince = useCallback(async () => {
    try {
      const res = await orderServices.getProvince(payload)
      console.log('🚀 ~ OrderPage ~ res:', res)
      setProvinces(res?.data)
    } catch (error) {
      console.log('🚀 ~ getProvince ~ error:', error)
    }
  }, [])

  const getDistricts = useCallback(
    async (districtId: string) => {
      try {
        const res = await orderServices.getDistrict(districtId)
        setDistricts(res?.data)
      } catch (error) {
        console.log('🚀 ~ getDistricts ~ error:', error)
      }
    },
    [province]
  )

  const getWards = useCallback(
    async (wardId: string) => {
      try {
        const res = await orderServices.getWards(wardId)
        setWards(res?.data)
      } catch (error) {
        console.log('🚀 ~ getWards ~ error:', error)
      }
    },
    [districts]
  )

  const handleCalculateTheTotalAmount = useCallback(() => {
    try {
      if (listOrders && listOrders.length) {
        const totalAmount = listOrders.reduce((acc: number, item: any) => {
          return item.total_price + acc
        }, 0)

        setTotalPrice(totalAmount)
      } else {
        setTotalPrice(0)
      }
    } catch (error) {
      console.log('🚀 ~ handleCalculateTheTotalAmount ~ error:', error)
    }
  }, [listOrders])

  const handleSubmit = async (value: any) => {
    try {
      const res = await orderServices.createOrder({ ...value, items: listOrders, total_price: totalPrice })
      if (res) {
        navigate(`${USER_PATH.ORDER_SUCCESS}`)
        openNotification('success', 'Thành công', 'Bạn đã đặt hàng thành công!')
      }
    } catch (error) {
      openNotificationError(error)
    }
  }

  useEffect(() => {
    getProvince()
  }, [])

  useEffect(() => {
    getDistricts(province)
  }, [province])

  useEffect(() => {
    getWards(district)
  }, [district])

  useEffect(() => {
    handleCalculateTheTotalAmount()
  }, [listOrders])

  return (
    <>
      <Form
        form={form}
        name='addEditCustomer'
        labelAlign='left'
        onFinish={handleSubmit}
        scrollToFirstError
        layout='vertical'
      >
        <div className='w-full h-[50px] pl-20 pr-20'>
          <div className='w-full border-b-2 h-[50px] flex items-center justify-start text-custom-sm'>
            <span>Giỏ hàng</span>
            <div className='border-r-2 border-border-basic ml-2 mr-2 w-[1px] h-[16px]'></div>
            <span className='font-semibold'>Thông tin giỏ hàng</span>
          </div>
        </div>
        <div className='w-full pl-20 pr-20 pt-10 pb-20 flex sm:flex-col md:flex-col lg:flex-row'>
          <div className='p-6 sm:w-full md:w-full lg:w-[60%] flex'>
            <div className='w-[80%]'>
              <Form.Item
                label='Họ và tên'
                className='w-full text-custom-sm'
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đầy đủ!'
                  },
                  {
                    pattern: Config._reg.name,
                    message: 'Họ và tên không hợp lệ!'
                  }
                ]}
              >
                <Input className='h-10' placeholder='Nhập họ và tên của bạn...' />
              </Form.Item>
              <Form.Item
                label='Số điện thoại'
                className='mt-3 '
                name='phone'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!'
                  },
                  {
                    pattern: Config._reg.phone,
                    message: 'Số điện thoại không hợp lệ!'
                  }
                ]}
              >
                <Input className='h-10' placeholder='Nhập số điện thoại của bạn...' />
              </Form.Item>
              <Form.Item
                label='Email'
                className='mt-5'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email!'
                  },
                  {
                    pattern: Config._reg.email,
                    message: 'Email không hợp lệ!'
                  }
                ]}
              >
                <Input type='email' placeholder='Nhập email của bạn...' className='h-10' />
              </Form.Item>

              <Form.Item
                label='Tỉnh/ Thành Phố'
                className='mt-5 mb-2'
                name='city'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!'
                  }
                ]}
              >
                <Select
                  className='h-10'
                  showSearch
                  placeholder='Chọn tỉnh/ Thành phố'
                  optionFilterProp='label'
                  onChange={(value) => {
                    setProvince(value)
                  }}
                  options={listProvince}
                />
              </Form.Item>
              <div className='w-full flex'>
                <div className='w-1/2 pr-4 '>
                  <Form.Item
                    label='Quận/ Huyện'
                    className='mt-5'
                    name='district'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn Chọn tỉnh, Thành phố!'
                      }
                    ]}
                  >
                    <Select
                      className='h-10'
                      showSearch
                      placeholder='Chọn Quận/ Huyện'
                      optionFilterProp='label'
                      onChange={(value) => {
                        setDistrict(value)
                      }}
                      // onSearch={onSearch}
                      options={listDistrict}
                    />
                  </Form.Item>
                </div>
                <div className='w-1/2'>
                  <Form.Item
                    label='Phường/ Xã'
                    className='mt-5'
                    name='ward'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn phường, xã!'
                      }
                    ]}
                  >
                    <Select
                      className='h-10'
                      showSearch
                      placeholder='Chọn Phường/ xã'
                      optionFilterProp='label'
                      options={listWards}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                label='Địa chỉ'
                name='address'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!'
                  }
                ]}
              >
                <TextArea placeholder='Địa chỉ chi tiết của bạn' autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
            </div>
          </div>

          <div className='p-6 sm:w-full md:w-full lg:w-[40%] bg-[#f5f5f5]'>
            <div>
              <h2 className='text-custom-xl uppercase font-semibold'>Đơn hàng</h2>
            </div>
            <div className='w-full border-t-2 border mt-6 mb-4'></div>
            <div>
              {listOrders &&
                listOrders.length &&
                listOrders.map((item: any) => (
                  <div>
                    <div className='flex justify-between'>
                      <div className='text-custom-sm font-semibold text-[#555] w-[70%]'>
                        <h2>{item?.product.name}</h2>
                      </div>
                      <div className='text-custom-sm font-semibold text-[#555]'>
                        <h2>{formatPrice(item.total_price)} VND</h2>
                      </div>
                    </div>
                    <div className='flex justify-between mt-2'>
                      <div className='text-custom-xs text-[#555]'>
                        <h3>Size: {item.size}</h3>
                      </div>
                      <div className='text-custom-xs text-[#555]'>
                        <h3> x {item.product_number}</h3>
                      </div>
                    </div>
                    <div className='w-full border-t-2 border-dashed mt-6 mb-4'></div>
                  </div>
                ))}
            </div>
            <div className='text-custom-sm '>
              <div className='flex justify-between mb-2 font-semibold'>
                <h2>Đơn hàng</h2>
                <h2>{formatPrice(totalPrice)} VNĐ</h2>
              </div>
              <div className='flex justify-between mb-2 font-semibold'>
                <h2>Giảm</h2>
                <h2>-87.000 VNĐ</h2>
              </div>
              <div className='flex justify-between mb-2'>
                <h2>Phí vận chuyển</h2>
                <h2>0 VNĐ</h2>
              </div>
              <div className='flex justify-between mb-2'>
                <h2>Phí thanh toán</h2>
                <h2>0 VNĐ</h2>
              </div>
              <div className='w-full border-t-2 border-dashed mt-6 mb-4'></div>
              {/* <div>
                <h2 className='text-custom-sm font-semibold'>Phương thức thanh toán</h2>
                <div>
                  <Form.Item
                    className='mt-3 mb-2'
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn phương thức giao hàng!'
                      }
                    ]}
                  >
                    <Checkbox
                      className='text-custom-sm'
                      // onChange={onChange}
                    >
                      Thanh toán khi nhận hàng
                    </Checkbox>
                  </Form.Item>
                </div>
              </div> */}
              {/* <div className='w-full border-t-2 border-dashed mt-6 mb-4'></div> */}
              <div>
                <div className='flex justify-between text-custom-xl uppercase font-semibold mt-6 mb-6'>
                  <h3>Tổng cộng</h3>
                  <h3 className='text-money font-extrabold'>{formatPrice(totalPrice)} VNĐ</h3>
                </div>
                <CustomButton label='Hoàn tất đặt hàng' />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default OrderPage
