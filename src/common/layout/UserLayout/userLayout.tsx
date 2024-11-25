import React from 'react'
import { Button, Form, Input, Layout } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

const { Header, Footer, Content } = Layout

const headerStyle: React.CSSProperties = {
  color: '#fff'
}

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  maxWidth: '100%'
}

const UserLayout: React.FC = ({ children }: any) => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle} className='flex items-center justify-between h-28 bg-baseBackground'>
        <div>
          <img className='w-28' src='/LOGO-WEBSHOP.jpg' alt='' />
        </div>
        <div className='flex items-center'>
          <div className='text-primary flex items-center justify-center '>
            <h4
              className='cursor-pointer p-5 text-custom-xs hover:text-hover transition duration-200'
              onClick={() => handleNavigate('/')} // Trang chủ
            >
              Trang chủ
            </h4>
            <h4
              className='cursor-pointer p-5 text-custom-xs hover:text-hover transition duration-200'
              onClick={() => handleNavigate('/product')} // Trang sản phẩm
            >
              Sản phẩm
            </h4>
            <h4
              className='cursor-pointer p-5 text-custom-xs hover:text-hover transition duration-200'
              onClick={() => handleNavigate('/help')} // Trợ giúp
            >
              Trợ giúp
            </h4>
            <h4
              className='cursor-pointer p-5 text-custom-xs hover:text-hover transition duration-200'
              onClick={() => handleNavigate('/account')} // Tài khoản
            >
              Tài khoản
            </h4>
          </div>
        </div>
      </Header>
      <Content className='bg-baseBackground'>
        <div>{children}</div>
      </Content>
      <Footer className='flex items-center justify-between p-0'>
        <div className='bg-[#FFF5EE] text-primary w-1/2 h-96 p-12 flex items-center justify-center'>
          <div>
            <div>
              <h3 className='text-custom-xl font-semibold'>Address</h3>
              <p className='text-custom-xs'>299 Trung Kính, Cầu Giấy, Hà Nội</p>
            </div>
            <div>
              <h3 className='text-custom-xl font-semibold'>Liên hệ</h3>
              <p className='text-custom-xs'>038.4609.456</p>
              <p className='text-custom-xs underline'>thesonshop@gmail.com</p>
            </div>
          </div>
        </div>
        <div className='bg-[#FFF5EE] text-primary w-1/2 h-96 p-12'>
          <div>
            <h1 className='text-custom-xl font-semibold mb-4'>Thông tin hỗ trợ</h1>
            <div className='w-[500px]'>
              <Form layout='vertical'>
                <Form.Item
                  name='phone'
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                  ]}
                >
                  <Input placeholder='Phone' />
                </Form.Item>
                <Form.Item
                  name='email'
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input placeholder='Email' />
                </Form.Item>
                <Form.Item>
                  <TextArea rows={4} placeholder='Nhập phản hồi' maxLength={6} />
                </Form.Item>

                <Form.Item>
                  <Button className='bg-[black]' type='primary' htmlType='submit'>
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  )
}

export default UserLayout
