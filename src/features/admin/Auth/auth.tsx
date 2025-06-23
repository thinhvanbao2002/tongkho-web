import { Button, Form, Input, Spin } from 'antd'
import { useState } from 'react'
import { authService } from './services/Apis'
import LocalStorage from 'apis/localStorage'
import { openNotification, openNotificationError } from 'common/utils'
import { useNavigate } from 'react-router'
import { ADMIN_PATH } from 'common/constants/paths'

function LoginAdminPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (value: any) => {
    setIsLoading(true)
    authService
      .login({
        phone: value?.phone,
        password: value?.password
      })
      .then((res: any) => {
        if (res.status) {
          if (res?.data?.role === 'admin') {
            LocalStorage.setToken(res?.data?.token)
            LocalStorage.setData(res?.data?.id)
            LocalStorage.setRole(res?.data?.role)
            setIsLoading(false)
            openNotification('success', 'Thành công!', 'Đăng nhập thành công.')
            navigate(ADMIN_PATH.OVERVIEW)
            console.log('11111111111')
          } else {
            console.log('2222222222222')
            openNotification('warning', 'Thất bại!', 'Không có quyền truy cập.')
            setIsLoading(false)
          }
        }
      })
      .catch((err) => {
        openNotificationError(err)
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <Spin spinning={isLoading} className='w-full h-full !max-h-none'>
          <div className='w-[500px] h-[600px] shadow-custom-lg rounded-xl p-4'>
            <div>
              <img className='w-[150px] mx-auto' src='/logo-v2.jpg' alt='' />
              <h3 className='text-custom-xl text-center'>Đăng nhập hệ thống quản trị</h3>
              <Form onFinish={handleSubmit} layout='vertical'>
                <Form.Item
                  label='Số điện thoại'
                  className='mt-10 '
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
                  <Input className='h-12' placeholder='Tài khoản của bạn...' />
                </Form.Item>
                <Form.Item
                  label='Mật khẩu'
                  className='mt-10'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu!'
                    }
                  ]}
                >
                  <Input placeholder='Mật khẩu của bạn...' className='h-12' />
                </Form.Item>
                <Form.Item>
                  <Button className='bg-[black] hover:bg-hover mt-5' type='primary' htmlType='submit'>
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Spin>
      </div>
    </>
  )
}

export default LoginAdminPage
