import { ADMIN_PATH, USER_PATH } from 'common/constants/paths.ts'
import React, { lazy } from 'react'

//Layout
const AdminLayout = lazy(() => import('../common/layout/AdminLayout/adminLayout.tsx'))

//Admin
const AdminLogin = lazy(() => import('../features/admin/Auth/auth.tsx'))
const AdminDashBoard = lazy(() => import('../features/admin/AdminDashboard/adminDashboard.tsx'))
const ManagerPage = lazy(() => import('../features/admin/Manager/ManagerPage.tsx'))

//User
const HomePage = lazy(() => import('../features/customer/home/Home.tsx'))
const UserLayout = lazy(() => import('../common/layout/UserLayout/userLayout.tsx'))
const CustomerLoginPage = lazy(() => import('../features/customer/auth/Login.tsx'))
const RegisterPage = lazy(() => import('../features/customer/register/Register.tsx'))
const ProductPage = lazy(() => import('../features/customer/product/Product.tsx'))
const ProductDetail = lazy(() => import('../features/customer/detailProduct/DetailProduct.tsx'))
const CartPage = lazy(() => import('../features/customer/cart/Cart.tsx'))
const OrderPage = lazy(() => import('../features/customer/order/Order.tsx'))
const UploadFile = lazy(() => import('../common/components/upload/UploadComponent.tsx'))
const UploadMultipartFile = lazy(() => import('../common/components/upload/UploadMultipartComponent.tsx'))

interface RouterProps {
  path: string
  component: React.FC | any
  params?: any
  layout?: any
}

export const adminRoutes: Array<RouterProps> = [
  {
    path: ADMIN_PATH.OVERVIEW,
    component: AdminDashBoard,
    layout: AdminLayout
  },
  {
    path: ADMIN_PATH.MANAGER,
    component: ManagerPage,
    layout: AdminLayout
  },
  {
    path: ADMIN_PATH.UPLOAD,
    component: UploadFile,
    layout: AdminLayout
  },
  {
    path: ADMIN_PATH.UPLOADS,
    component: UploadMultipartFile,
    layout: AdminLayout
  }
]

export const userRoutes: Array<RouterProps> = [
  {
    path: USER_PATH.CART,
    component: AdminLogin,
    layout: UserLayout
  }
]

export const publicRoutes: Array<RouterProps> = [
  {
    path: '',
    component: HomePage,
    layout: UserLayout
  },
  {
    path: ADMIN_PATH.LOGIN,
    component: AdminLogin
  },
  {
    path: USER_PATH.LOGIN,
    component: CustomerLoginPage
  },
  {
    path: USER_PATH.REGISTER,
    component: RegisterPage
  },
  {
    path: USER_PATH.PRODUCT,
    component: ProductPage,
    layout: UserLayout
  },
  {
    path: USER_PATH.PRODUCT_DETAIL + '/:id',
    component: ProductDetail,
    layout: UserLayout
  },
  {
    path: USER_PATH.CART,
    component: CartPage,
    layout: UserLayout
  },
  {
    path: USER_PATH.ORDER,
    component: OrderPage,
    layout: UserLayout
  }
]
