import { Button, Form, Input } from 'antd'
import Config from 'common/constants/config'

function RegisterPage() {
  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-[500px]  shadow-custom-lg rounded-xl p-4'>
          <div>
            <img className='w-[150px] mx-auto' src='/LOGO-WEBSHOP.jpg' alt='' />
            <h3 className='text-custom-xl text-center'>Đăng kí</h3>
            <Form layout='vertical'>
              <Form.Item
                label='Họ và tên'
                className='mt-10 '
                name='fullName'
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
                <Input className='h-12' placeholder='Tài khoản của bạn...' />
              </Form.Item>
              <Form.Item
                label='Số điện thoại'
                className='mt-5 '
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
                <Input className='h-12' placeholder='Tài khoản của bạn...' />
              </Form.Item>
              <Form.Item
                label='Mật khẩu'
                className='mt-5'
                name='pass'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!'
                  },
                  {
                    pattern: Config._reg.pass,
                    required: true,
                    message: 'Mật khẩu không hợp lệ!'
                  }
                ]}
              >
                <Input type='password' placeholder='Mật khẩu của bạn...' className='h-12' />
              </Form.Item>
              <Form.Item
                label='Nhập lại mật khẩu'
                className='mt-5'
                name='pass'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!'
                  },
                  {
                    pattern: Config._reg.pass,
                    required: true,
                    message: 'Mật khẩu không hợp lệ!'
                  }
                ]}
              >
                <Input type='password' placeholder='Mật khẩu của bạn...' className='h-12' />
              </Form.Item>
              <Form.Item>
                <Button className='bg-[black] hover:bg-hover mt-5' type='primary' htmlType='submit'>
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
