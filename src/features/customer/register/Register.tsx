import { Button, Form, Input } from 'antd'
import Config from 'common/constants/config'
import { openNotification, openNotificationError } from 'common/utils'
import { accountServices } from '../account/accountApis'
import { useNavigate } from 'react-router'
import { USER_PATH } from 'common/constants/paths'

function RegisterPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const res = await accountServices.register(values)
      if (res) {
        openNotification('success', 'Thành công', 'Đăng kí tài khoản thành công')
        navigate(`${USER_PATH.LOGIN}`)
      }
    } catch (error) {
      openNotificationError(error)
    }
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-[500px] shadow-custom-lg rounded-xl p-4'>
        <div className='mt-10'>
          <img className='w-[150px] mx-auto' src='/LOGO-WEBSHOP.jpg' alt='' />
          <h3 className='text-custom-xl text-center'>Đăng kí tài khoản</h3>
          <Form layout='vertical' form={form}>
            <Form.Item
              label='Họ và tên'
              name='name'
              rules={[
                { required: true, message: 'Vui lòng nhập tên đầy đủ!' },
                { pattern: Config._reg.name, message: 'Họ và tên không hợp lệ!' }
              ]}
            >
              <Input className='h-12' placeholder='Tài khoản của bạn...' />
            </Form.Item>

            <Form.Item
              label='Số điện thoại'
              className='mt-5'
              name='phone'
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: Config._reg.phone, message: 'Số điện thoại không hợp lệ!' }
              ]}
            >
              <Input className='h-12' placeholder='Tài khoản của bạn...' />
            </Form.Item>

            <Form.Item
              label='Email'
              className='mt-5'
              name='email'
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { pattern: Config._reg.email, message: 'Email không hợp lệ!' }
              ]}
            >
              <Input className='h-12' placeholder='Email của bạn...' />
            </Form.Item>

            <Form.Item
              label='Mật khẩu'
              className='mt-5'
              name='password'
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { pattern: Config._reg.pass, message: 'Mật khẩu không hợp lệ!' }
              ]}
              hasFeedback
            >
              <Input.Password className='h-12' placeholder='Mật khẩu của bạn...' />
            </Form.Item>

            <Form.Item
              label='Nhập lại mật khẩu'
              className='mt-5'
              name='confirmPassword'
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'))
                  }
                })
              ]}
            >
              <Input.Password className='h-12' placeholder='Nhập lại mật khẩu...' />
            </Form.Item>

            <Form.Item>
              <Button
                className='bg-black hover:bg-gray-700 mt-5 w-full'
                type='primary'
                htmlType='submit'
                onClick={handleSubmit}
              >
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
