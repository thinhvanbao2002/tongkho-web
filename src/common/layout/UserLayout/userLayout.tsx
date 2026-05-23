import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Avatar, AutoComplete, Button, Dropdown, Form, Input, Layout } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd/lib'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from 'redux/slice/login.slice'
import { formatPrice, openNotification } from 'common/utils'
import _ from 'lodash'
import { USER_PATH } from 'common/constants/paths'
import AccountUser from 'features/customer/account/components/Account'
import { AnimatePresence } from 'framer-motion'
import PageTransition from 'common/components/PageTransition'
import { productServices } from 'features/customer/product/productApis'

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
  const location = useLocation()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<any>({})
  const data = useSelector((state: any) => state.login)
  const [modalAccountIsvisible, setModalAccountIsVisible] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Array<any>>([])
  const [searchLoading, setSearchLoading] = useState<boolean>(false)

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const searchProducts = useMemo(
    () =>
      _.debounce(async (value: string) => {
        const query = String(value || '').trim()
        if (!query) {
          setSearchResults([])
          setSearchLoading(false)
          return
        }

        setSearchLoading(true)
        try {
          const res = await productServices.get({ page: 1, take: 10, q: query })
          console.log('🚀 ~ UserLayout ~ res:', res)
          setSearchResults(res?.data || [])
        } catch {
          setSearchResults([])
        } finally {
          setSearchLoading(false)
        }
      }, 300),
    []
  )

  const handleSelectProduct = (value: string, option: any) => {
    const productId = option?.productId || option?.value
    if (productId) {
      navigate(`${USER_PATH.PRODUCT_DETAIL}/${productId}`)
      setSearchValue('')
      setSearchResults([])
    }
  }

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    if (!searchValue) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }
    searchProducts(searchValue)
    return () => {
      searchProducts.cancel?.()
    }
  }, [searchValue, searchProducts])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('data')
    dispatch(setLogin(undefined))
    openNotification('success', 'Thành công', 'Đăng xuất thành công!')
    handleNavigate('/')
  }, [])

  const handleCloseModal = () => {
    setModalAccountIsVisible(false)
  }

  useEffect(() => {
    setUserData(data)
  }, [data])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to='/order/history'>Đơn hàng</Link>
    },
    {
      key: '2',
      label: (
        <p
          rel='noopener noreferrer'
          onClick={() => {
            setModalAccountIsVisible(!modalAccountIsvisible)
          }}
        >
          Tài khoản
        </p>
      )
    },
    {
      key: '3',
      label: _.isEmpty(data.user) ? (
        <div
          onClick={() => {
            navigate(USER_PATH.LOGIN)
          }}
        >
          Đăng nhập
        </div>
      ) : (
        <div onClick={handleLogout}>Đăng xuất</div>
      )
    }
  ]

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle} className='flex items-center justify-between h-32 px-8 bg-baseBackground shadow-sm'>
        <div>
          <img style={{ width: 220 }} src='/luna-v2.png' alt='Luna Logo' />
        </div>
        <div className='flex items-center gap-5'>
          <div className='text-primary flex items-center justify-center uppercase font-semibold space-x-2'>
            <h4
              className='cursor-pointer px-4 py-3 text-custom-xs hover:text-money transition duration-200 rounded-lg hover:bg-white/10'
              onClick={() => handleNavigate('/')}
            >
              Trang chủ
            </h4>
            <h4
              className='cursor-pointer px-4 py-3 text-custom-xs hover:text-money transition duration-200 rounded-lg hover:bg-white/10'
              onClick={() => handleNavigate('/product')}
            >
              Sản phẩm
            </h4>
            <div
              className='cursor-pointer px-4 py-3 text-custom-xs hover:text-money transition duration-200 rounded-lg hover:bg-white/10 relative'
              onClick={() => handleNavigate('/cart')}
            >
              <div>Giỏ hàng</div>
            </div>
          </div>
          <div className='w-[380px] min-w-[280px] mb-3'>
            <AutoComplete
              value={searchValue}
              options={searchResults.map((product: any) => ({
                value: String(product?.id),
                label: (
                  <div className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100'>
                    <img
                      src={product?.image || product?.thumbnail || 'https://via.placeholder.com/48'}
                      alt={product?.name}
                      className='h-12 w-12 rounded object-cover'
                    />
                    <div className='overflow-hidden'>
                      <div className='text-sm font-semibold text-gray-900 line-clamp-2'>{product?.name}</div>
                      {product?.price != null && (
                        <div className='text-[11px] text-gray-500'>{formatPrice(product.price)} VND</div>
                      )}
                    </div>
                  </div>
                ),
                productId: product?.id
              }))}
              onSelect={handleSelectProduct}
              onSearch={handleSearchValueChange}
              onChange={handleSearchValueChange}
              notFoundContent={searchLoading ? 'Đang tìm...' : 'Không tìm thấy sản phẩm'}
              className='w-full rounded-full'
              dropdownMatchSelectWidth={380}
              dropdownStyle={{ maxHeight: 420, overflowY: 'auto', borderRadius: 16 }}
            >
              <Input.Search
                size='middle'
                placeholder='Tìm sản phẩm...'
                enterButton={false}
                loading={searchLoading}
                allowClear
                className='rounded-full bg-white border-slate-200'
              />
            </AutoComplete>
          </div>
        </div>
        <div className='flex items-center'>
          <h4 className='cursor-pointer p-5 text-custom-xs hover:text-money transition duration-200'>
            <Dropdown menu={{ items }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
              <Avatar size={44} src={userData?.user?.avatar} icon={<UserOutlined />} />
            </Dropdown>
          </h4>
        </div>
      </Header>
      <Content className='bg-baseBackground'>
        <AnimatePresence mode='wait'>
          <PageTransition key={location.pathname}>
            <div>{children}</div>
          </PageTransition>
        </AnimatePresence>
      </Content>
      <Footer className='flex items-center justify-between p-0'>
        <div className='bg-[#FFF5EE] text-primary w-1/2 h-96 p-12 flex items-center justify-center'>
          <div>
            <div>
              <h3 className='text-custom-xl font-semibold'>Địa chỉ</h3>
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
      <AccountUser openModal={modalAccountIsvisible} titleModal='Thông tin tài khoản' onClose={handleCloseModal} />
    </Layout>
  )
}

export default UserLayout
