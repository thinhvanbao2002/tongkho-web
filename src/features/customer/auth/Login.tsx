import { Button, Form, Input, Spin } from 'antd'
import { useState } from 'react'
import { authService } from './service/Apis'
import LocalStorage from 'apis/localStorage'
import { openNotification } from 'common/utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/slice/login.slice'

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
          LocalStorage.setToken(res?.data?.token)
          LocalStorage.setData(res?.data?.id)
          LocalStorage.setRole(res?.data?.role)
          setIsLoading(false)
          openNotification('success', 'Thành công!', 'Đăng nhập thành công.')
          dispatch(setLogin(res?.data))
          navigate('/')
        }
      })
  }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <Spin spinning={isLoading} className='w-full h-full !max-h-none'>
          <div className='w-[500px] h-[600px] shadow-custom-lg rounded-xl p-4'>
            <div>
              <img className='w-[150px] mx-auto' src='/LOGO-WEBSHOP.jpg' alt='' />
              <h3 className='text-custom-xl text-center'>Đăng nhập</h3>
              <Form onFinish={handleSubmit} layout='vertical'>
                <Form.Item
                  label='Số điện thoại'
                  className='mt-5'
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
                  className='mt-5'
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
                <Form.Item className='text-center'>
                  <Button className='bg-[black] hover:bg-hover mt-5 w-full' type='primary' htmlType='submit'>
                    Đăng nhập
                  </Button>
                </Form.Item>
                <div className='text-custom-sm text-center'>
                  <p>
                    Bạn chưa có tài khoản{' '}
                    <a className='text-[blue]' href='/register'>
                      Đăng kí tại đây
                    </a>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </Spin>
      </div>
    </>
  )
}

export default LoginPage
