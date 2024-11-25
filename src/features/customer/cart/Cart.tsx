import { Select } from 'antd'
import CustomButton from 'common/components/button/Button'

function CartPage() {
  return (
    <>
      <div className='w-full h-[50px] pl-20 pr-20'>
        <div className='w-full border-b-2 h-[50px] flex items-center justify-start text-custom-sm'>
          <span>Giỏ hàng</span>
          <div className='border-r-2 border-border-basic ml-2 mr-2 w-[1px] h-[16px]'></div>
          <span className='font-semibold'>Thông tin giỏ hàng</span>
        </div>
      </div>
      <div className='w-full pl-20 pr-20 pt-10 pb-20 flex sm:flex-col md:flex-col lg:flex-row'>
        <div className='p-6 sm:w-full md:w-full lg:w-[60%] flex'>
          <div className='flex flex-col'>
            {/* Item */}
            <div>
              <div className='flex'>
                <div className='mr-5'>
                  <img
                    className='w-[160px] h-full object-cover'
                    src='https://ananas.vn/wp-content/uploads/Pro_ABT00032_1-500x500.jpg'
                    alt=''
                  />
                </div>
                <div className='flex flex-col justify-between w-[70%]'>
                  <div>
                    <div>
                      <div>
                        <h2 className='text-custom-sm font-semibold uppercase'>
                          Basic Pocket Tee - Ananas Mini Label - Caviar Black
                        </h2>
                      </div>
                      <div className='flex items-center mt-2'>
                        <span className='text-custom-xs'>Giá:</span>
                        <h3 className='ml-1 text-custom-sm font-semibold'>290.000 VND</h3>
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='mr-10'>
                        <div className='text-custom-sm'>Size</div>
                        <div>
                          <Select
                            defaultValue='l'
                            style={{ width: 100 }}
                            options={[
                              { value: 's', label: 'S' },
                              { value: 'm', label: 'M' },
                              { value: 'l', label: 'L' },
                              { value: 'xl', label: 'XL' },
                              { value: '2xl', label: '2XL' }
                            ]}
                          />
                        </div>
                      </div>
                      <div>
                        <div className='text-custom-sm'>Số lượng</div>
                        <div>
                          <Select
                            defaultValue='1'
                            style={{ width: 100 }}
                            options={[
                              { value: '1', label: '1' },
                              { value: '2', label: '2' },
                              { value: '3', label: '3' },
                              { value: '4', label: '4' },
                              { value: '5', label: '5' },
                              { value: '6', label: '6' },
                              { value: '7', label: '7' },
                              { value: '8', label: '8' }
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-[30%] text-right flex flex-col justify-between'>
                  <div>
                    <div>
                      <h2 className='text-custom-xl font-semibold text-money'>290.000 VND</h2>
                    </div>
                    <div>
                      <span className='text-custom-xs text-money italic'>Còn hàng</span>
                    </div>
                  </div>
                  <div>
                    <button className='pt-2 pb-2 w-[100px] bg-black text-while text-custom-xs rounded-lg hover:text-while hover:bg-money transform transition-all'>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Item */}
          </div>
        </div>

        <div className='p-6 sm:w-full md:w-full lg:w-[40%] bg-[#f5f5f5]'>
          <div>
            <h2 className='text-custom-xl font-semibold uppercase '>Thông tin đơn hàng</h2>
          </div>
          <div className='w-full border-t-2 border mt-6'></div>
          <div className='mt-6'>
            <h3 className='text-custom-sm uppercase font-semibold mb-2'>Nhập mã khuyến mãi</h3>
            <div>
              <div className='bg-baseBackground relative flex border border-[#ccc] rounded-lg overflow-hidden'>
                <input className='border-none outline-none w-full text-custom-sm pl-3 h-51px ' type='text' />
                <button className='uppercase right-0 w-[30%] h-[51px] top-0 pl-6 pr-6 pt-2 pb-2 bg-money text-custom-xs font-semibold text-while hover:opacity-55'>
                  áp dụng
                </button>
              </div>
            </div>
          </div>
          <div className='w-full border-t-2 border-dashed mt-6'></div>
          <div className='mt-6 mb-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-custom-sm text-[#808080] font-semibold'>Đơn hàng</h3>
              <h3 className='text-custom-xl text-[#808080] font-semibold'>870.000 VNĐ</h3>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-custom-sm text-[#808080] font-semibold'>Giảm</h3>
              <h3 className='text-custom-xl text-[#808080]'>87.000 VNĐ</h3>
            </div>
          </div>
          <div className='w-full border-t-2 border-dashed mt-6'></div>
          <div className='mt-6 mb-6 text-custom-xl uppercase flex items-center justify-between'>
            <div className='font-semibold'>Tạm tính</div>
            <div className='font-extrabold text-money'>783.000 VNĐ</div>
          </div>
          <div className='mt-16'>
            <CustomButton label='Đặt hàng ngay' />
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
