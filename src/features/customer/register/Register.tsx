import { Button, Form, Input, Typography, message, Spin } from 'antd'
import Config from 'common/constants/config'
import { openNotification, openNotificationError } from 'common/utils'
import { accountServices } from '../account/accountApis'
import { useNavigate } from 'react-router'
import { USER_PATH } from 'common/constants/paths'
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'

const { Title, Text } = Typography

function RegisterPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await accountServices.register(values)
      if (res) {
        openNotification('success', 'Thành công', 'Đăng kí tài khoản thành công')
        navigate(`${USER_PATH.LOGIN}`)
      }
    } catch (error) {
      openNotificationError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Spin spinning={loading} className="w-full h-full !max-h-none">
        <div className="container mx-auto px-4 h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="hidden md:block md:w-1/2 bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <img 
                      src="/logo-v2.jpg" 
                      alt="Logo" 
                      className="w-64 h-64 mx-auto mb-6 rounded-full shadow-lg object-cover"
                    />
                    <Title level={2} className="text-gray-800 mb-4">
                      Tạo tài khoản mới
                    </Title>
                    <Text className="text-gray-600">
                      Tham gia cùng chúng tôi để trải nghiệm mua sắm tốt nhất
                    </Text>
                  </div>
                </div>
              </div>

              {/* Right side - Register Form */}
              <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <img 
                      src="/logo-v2.jpg" 
                      alt="Logo" 
                      className="w-40 h-40 mx-auto mb-4 rounded-full shadow-md md:hidden object-cover"
                    />
                    <Title level={3} className="mb-2">
                      Đăng ký tài khoản
                    </Title>
                    <Text className="text-gray-500">
                      Vui lòng điền đầy đủ thông tin để đăng ký
                    </Text>
                  </div>

                  <Form
                    form={form}
                    layout="vertical"
                    size="large"
                    className="space-y-4"
                  >
                    <Form.Item
                      name="name"
                      rules={[
                        { required: true, message: 'Vui lòng nhập tên đầy đủ!' },
                        { pattern: Config._reg.name, message: 'Họ và tên không hợp lệ!' }
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Họ và tên của bạn"
                        className="h-12 rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        { pattern: Config._reg.phone, message: 'Số điện thoại không hợp lệ!' }
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="Số điện thoại của bạn"
                        className="h-12 rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { pattern: Config._reg.email, message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="Email của bạn"
                        className="h-12 rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { pattern: Config._reg.pass, message: 'Mật khẩu không hợp lệ!' }
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Mật khẩu của bạn"
                        className="h-12 rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
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
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Nhập lại mật khẩu"
                        className="h-12 rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item className="mb-4">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full h-12 rounded-lg bg-black hover:bg-gray-800 transition-colors"
                        onClick={handleSubmit}
                        loading={loading}
                      >
                        Đăng ký
                      </Button>
                    </Form.Item>

                    <div className="text-center">
                      <Text className="text-gray-600">
                        Đã có tài khoản?{' '}
                        <a 
                          href={USER_PATH.LOGIN}
                          className="text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                          Đăng nhập ngay
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

export default RegisterPage
