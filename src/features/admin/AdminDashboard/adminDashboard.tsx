import { useCallback, useEffect, useState } from 'react'
import './adminDashbroad.css'
import { adminDashboardServices } from './adminDashboardApis'
import { formatPrice } from 'common/utils'
import RevenueChart from './components/RevenueData'

function AdminDashboardScreen() {
  const [adminDashboardData, setAdminDashboardData] = useState<any>({})

  const getAdminDashboarData = useCallback(async () => {
    try {
      const res = await adminDashboardServices.get()
      if (res) {
        setAdminDashboardData({ ...res?.data })
      }
    } catch (error) {
      console.log('🚀 ~ getAdminDashboarData ~ error:', error)
    }
  }, [])

  useEffect(() => {
    getAdminDashboarData()
  }, [])
  return (
    <>
      <div className='w-full flex items-center justify-between text-custom-sm text-while'>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Khách hàng</div>
            <div className='font-semibold text-custom-xl'>{formatPrice(adminDashboardData.countUsers)}</div>
          </div>
        </div>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Sản phẩm</div>
            <div className='font-semibold text-custom-xl'>{formatPrice(adminDashboardData.countProducts)}</div>
          </div>
        </div>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Loại sản phẩm</div>
            <div className='font-semibold text-custom-xl'>{formatPrice(adminDashboardData.countCategories)}</div>
          </div>
        </div>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Đơn hàng</div>
            <div className='font-semibold text-custom-xl'>{formatPrice(adminDashboardData.countOrders)}</div>
          </div>
        </div>
      </div>
      <div>
        <RevenueChart />
      </div>
    </>
  )
}

export default AdminDashboardScreen
