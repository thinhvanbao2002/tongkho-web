import './adminDashbroad.css'

function AdminDashboardScreen() {
  return (
    <>
      <div className='w-full flex items-center justify-between text-custom-sm text-while'>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Khách hàng</div>
            <div className='font-semibold text-custom-xl'>1,500</div>
          </div>
        </div>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Sản phẩm</div>
            <div className='font-semibold text-custom-xl'>900</div>
          </div>
        </div>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Loại sản phẩm</div>
            <div className='font-semibold text-custom-xl'>21</div>
          </div>
        </div>
        <div className='w-[20%] h-[100px] shadow-block rounded-md gradient-1 flex items-center justify-center  '>
          <div className='text-center'>
            <div>Đơn hàng</div>
            <div className='font-semibold text-custom-xl'>1,900</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardScreen
