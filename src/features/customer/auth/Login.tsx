import { Button, Form, Input, Spin, Typography } from 'antd'
import { useState } from 'react'
import { authService } from './service/Apis'
import LocalStorage from 'apis/localStorage'
import { openNotification, openNotificationError } from 'common/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/slice/login.slice'
import { LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text } = Typography

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const handleSubmit = async (value: any) => {
    try {
      setIsLoading(true)
      const res = await authService.login({
        phone: value?.phone,
        password: value?.password
      })

      if (res.status) {
        LocalStorage.setToken(res?.data?.token)
        LocalStorage.setData(res?.data?.id)
        LocalStorage.setRole(res?.data?.role)
        openNotification('success', 'Thành công!', 'Đăng nhập thành công.')
        dispatch(setLogin(res?.data))
        navigate('/')
      }
    } catch (error: any) {
      // message.error(error?.message || 'Đăng nhập thất bại. Vui lòng thử lại!')
      openNotificationError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      <Spin spinning={isLoading} className='w-full h-full !max-h-none'>
        <div className='container mx-auto px-4 h-screen flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden'
          >
            <div className='flex flex-col md:flex-row'>
              {/* Left side - Image */}
              <div className='hidden md:block md:w-1/2 bg-white relative'>
                <div className='absolute inset-0 flex items-center justify-center p-8'>
                  <div className='text-center'>
                    <img
                      src='/logo-v2.jpg'
                      alt='Logo'
                      className='w-64 h-64 mx-auto mb-6 rounded-full shadow-lg object-cover'
                    />
                    <Title level={2} className='text-gray-800 mb-4'>
                      Chào mừng trở lại!
                    </Title>
                    <Text className='text-gray-600'>Đăng nhập để tiếp tục mua sắm và quản lý đơn hàng của bạn</Text>
                  </div>
                </div>
              </div>

              {/* Right side - Login Form */}
              <div className='w-full md:w-1/2 p-8 md:p-12'>
                <div className='max-w-md mx-auto'>
                  <div className='text-center mb-8'>
                    <img
                      src='/logo-v2.jpg'
                      alt='Logo'
                      className='w-40 h-40 mx-auto mb-4 rounded-full shadow-md md:hidden object-cover'
                    />
                    <Title level={3} className='mb-2'>
                      Đăng nhập
                    </Title>
                    <Text className='text-gray-500'>Vui lòng đăng nhập để tiếp tục</Text>
                  </div>

                  <Form form={form} onFinish={handleSubmit} layout='vertical' size='large' className='space-y-4'>
                    <Form.Item
                      name='phone'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!'
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: 'Số điện thoại không hợp lệ!'
                        }
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined className='text-gray-400' />}
                        placeholder='Số điện thoại của bạn'
                        className='h-12 rounded-lg'
                      />
                    </Form.Item>

                    <Form.Item
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu!'
                        }
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className='text-gray-400' />}
                        placeholder='Mật khẩu của bạn'
                        className='h-12 rounded-lg'
                      />
                    </Form.Item>

                    <Form.Item className='mb-4'>
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='w-full h-12 rounded-lg bg-black hover:bg-gray-800 transition-colors'
                        loading={isLoading}
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>

                    <div className='text-center'>
                      <Text className='text-gray-600'>
                        Bạn chưa có tài khoản?{' '}
                        <a
                          href='/register'
                          className='text-primary hover:text-primary-dark font-medium transition-colors'
                        >
                          Đăng ký ngay
                        </a>
                      </Text>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Spin>
    </div>
  )
}

export default LoginPage
