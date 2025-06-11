import React, { useCallback, useEffect, useState } from 'react'
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  ImportOutlined,
  ExportOutlined,
  TeamOutlined,
  LineChartOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown, Layout, Menu, theme, Typography } from 'antd'
import { ADMIN_PATH } from 'common/constants/paths'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openNotification } from 'common/utils'
import { setLogin } from 'redux/slice/login.slice'

const { Header, Content, Sider } = Layout
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  fnc?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick: fnc
  } as MenuItem
}

const itemsMenu: MenuItem[] = [
  getItem(<Link to={ADMIN_PATH.OVERVIEW}>Tổng quan</Link>, '1', <LineChartOutlined />),
  getItem(<Link to={ADMIN_PATH.CUSTOMER}>Khách hàng</Link>, '2', <UserOutlined />),
  getItem(<Link to={ADMIN_PATH.MANAGER}>Tài khoản</Link>, '3', <TeamOutlined />),
  getItem('Bán hàng', 'sub1', <UserOutlined />, [
    getItem(<Link to={ADMIN_PATH.CATEGORY}>Danh mục</Link>, '4'),
    getItem(<Link to={ADMIN_PATH.PRODUCT}>Sản phẩm</Link>, '5'),
    getItem(<Link to={ADMIN_PATH.ORDER}>Đơn hàng</Link>, '6')
  ]),
  getItem('Kho hàng', 'sub2', <HomeOutlined />, [
    getItem(<Link to={ADMIN_PATH.WAREHOUSE}>Nhà kho</Link>, '7', <ImportOutlined />),
    getItem(<Link to={ADMIN_PATH.IMPORT_WAREHOUSE}>Nhập hàng</Link>, '8', <ImportOutlined />),
    getItem(<Link to={ADMIN_PATH.BLOG}>Xuất hàng</Link>, '9', <ExportOutlined />)
  ])
]

const AdminLayout: React.FC = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const [titleHeader, setTitleHeader] = useState<string>('Tổng quan')
  const [keySider, setKeySider] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { pathname } = window.location

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('data')
    dispatch(setLogin(undefined))
    openNotification('success', 'Thành công', 'Đăng xuất thành công!')
    handleNavigate(`${ADMIN_PATH.LOGIN}`)
  }, [dispatch])

  const items: MenuItem[] = [
    getItem(
      'Đổi mật khẩu',
      '1',
      <svg
        viewBox='64 64 896 896'
        focusable='false'
        data-icon='edit'
        width='1em'
        height='1em'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z'></path>
      </svg>
    ),
    getItem('Đăng xuất', '2', <LogoutOutlined />, undefined, handleLogout)
  ]

  useEffect(() => {
    if (/^\/ad-e-order\/\d+$/.test(pathname)) {
      setTitleHeader('Chi tiết đơn hàng')
      setKeySider('6')
    } else {
      switch (pathname) {
        case ADMIN_PATH.PRODUCT:
          setTitleHeader('Danh sách sản phẩm')
          setKeySider('5')
          break
        case ADMIN_PATH.CREATE_UPDATE_PRODUCT:
          setTitleHeader('Thêm mới/Cập nhật sản phẩm')
          setKeySider('5')
          break
        case ADMIN_PATH.CATEGORY:
          setTitleHeader('Danh sách danh mục')
          setKeySider('4')
          break
        case ADMIN_PATH.MANAGER:
          setTitleHeader('Danh sách tài khoản quản trị')
          setKeySider('3')
          break
        case ADMIN_PATH.CUSTOMER:
          setTitleHeader('Danh sách khách hàng')
          setKeySider('2')
          break
        case ADMIN_PATH.ORDER:
          setTitleHeader('Danh sách đơn hàng')
          setKeySider('6')
          break
        case ADMIN_PATH.OVERVIEW:
          setTitleHeader('Thống kê báo cáo')
          setKeySider('1')
          break
        case ADMIN_PATH.WAREHOUSE:
          setTitleHeader('Kho hàng')
          setKeySider('7')
          break
        case ADMIN_PATH.IMPORT_WAREHOUSE:
          setTitleHeader('Nhập hàng')
          setKeySider('8')
          break
        default:
          setTitleHeader('Tổng quan')
      }
    }
  }, [pathname])

  return (
    <Layout style={{ minHeight: '100vh', background: 'white' }}>
      <Sider 
        theme='light' 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: 'white' }}
      >
        <div className='flex flex-col items-center justify-center py-6 px-4'>
          <img 
            src="/logo-v2.jpg" 
            alt="Logo" 
            className={`${collapsed ? 'w-12 h-12' : 'w-24 h-24'} rounded-full shadow-md object-cover transition-all duration-300`}
          />
        </div>
        <Menu 
          selectedKeys={[keySider]} 
          defaultSelectedKeys={['1']} 
          mode='inline' 
          items={itemsMenu}
          className="border-0"
          style={{ background: 'white' }}
        />
      </Sider>
      <Layout style={{ background: 'white' }}>
        <Header 
          style={{ background: 'white' }} 
          className='flex items-center justify-between pr-4 pl-4'
        >
          <div className='text-lg font-medium'>{titleHeader}</div>
          <div>
            <Dropdown menu={{ items }} placement='bottomRight' arrow>
              <Avatar 
                size={40} 
                icon={<UserOutlined />} 
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Dropdown>
          </div>
        </Header>
        <Content className='bg-white p-6'>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
