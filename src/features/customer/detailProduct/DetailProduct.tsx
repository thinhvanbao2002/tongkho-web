import { Image, Select, Space } from 'antd'
function DetailProductPage() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  return (
    <>
      <div className='w-full h-[50px] pl-20 pr-20'>
        <div className='w-full border-b-2 h-[50px] flex items-center justify-start text-custom-sm'>
          <span>Sản phẩm</span>
          <div className='border-r-2 border-border-basic ml-2 mr-2 w-[1px] h-[16px]'></div>
          <span>Basas</span>
          <div className='border-r-2 border-border-basic ml-2 mr-2 w-[1px] h-[16px] '></div>
          <span className='font-semibold'>Giày thể thao basic</span>
        </div>
      </div>
      <div className='w-full pl-20 pr-20 pt-10 pb-20 flex sm:flex-col md:flex-col lg:flex-row'>
        <div className='p-6 sm:w-full  md:w-full lg:w-[60%]'>
          <div>
            <Image
              className='object-cover w-full h-auto'
              src='https://ananas.vn/wp-content/uploads/Pro_ABT00034_1.jpg'
            />
          </div>
          <div className='flex mt-2 overflow-x-scroll'>
            <Image
              style={{ width: '150px' }}
              className='object-cover p-1'
              src='https://ananas.vn/wp-content/uploads/Pro_ABT00034_1.jpg'
            />
            <Image
              style={{ width: '150px' }}
              className='object-cover p-1'
              src='https://ananas.vn/wp-content/uploads/Pro_ABT00034_1.jpg'
            />
            <Image
              style={{ width: '150px' }}
              className='object-cover p-1'
              src='https://ananas.vn/wp-content/uploads/Pro_ABT00034_1.jpg'
            />
            <Image
              style={{ width: '150px' }}
              className='object-cover p-1'
              src='https://ananas.vn/wp-content/uploads/Pro_ABT00034_1.jpg'
            />
          </div>
        </div>
        <div className='w-full p-6 lg:w-[40%]'>
          <div>
            <h2 className='uppercase text-custom-xl font-semibold'>Basic Pocket Tee - Ananas Mini Label - Dune</h2>
          </div>
          <div className='flex items-center justify-between text-custom-sm mt-4'>
            <div className='flex'>
              <span>Mã sản phẩm:</span>
              <h3 className='font-semibold ml-2'>BHD221</h3>
            </div>
            <div className='flex'>
              <span>Tình trạng:</span>
              <h3 className='font-semibold ml-2'>Còn hàng</h3>
            </div>
          </div>
          <div className='mt-6'>
            <h2 className='font-extrabold text-custom-xl text-money'>290.000 VND</h2>
          </div>
          <div className='w-full border-t-2 border-dashed mt-6'></div>
          <div className='mt-5'>
            <p className='text-custom-xs text-justify'>
              Áo thun ngắn tay, có túi với màu trơn đơn giản, form áo căn bản; vải được dệt từ 100% sợi cotton to, thô
              mộc, đứng dáng. Tem dệt Ananas xanh, nho nhỏ kẹp nhẹ nhàng bên cạnh trái túi tạo điểm nhấn vừa phải, không
              làm mất đi định hướng của áo cơ bản. Phối và ứng dụng bất chấp trong mọi ngày, mọi thể loại trang phục
              (nếu hợp màu).
            </p>
          </div>
          <div className='w-full border-t-2 border-dashed mt-6'></div>
          <div className='flex items-center justify-between text-custom-sm mt-6'>
            <div>
              <div className='flex flex-col'>
                <span>SIZE</span>
                <Select
                  defaultValue='l'
                  style={{ width: 180 }}
                  onChange={handleChange}
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
              <div className='flex flex-col'>
                <span>SỐ LƯỢNG</span>
                <Select
                  defaultValue='1'
                  style={{ width: 180 }}
                  onChange={handleChange}
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
          <div className='w-full border-t-2 border-dashed mt-6'></div>
          <div className='mt-10'>
            <div>
              <div>
                <button className='uppercase w-full p-5 bg-black text-while text-custom-xl rounded-lg shadow-xl'>
                  thêm vào giỏ hàng
                </button>
              </div>
            </div>
            <div>
              <button className='mt-6 uppercase w-full p-5 bg-money text-while text-custom-xl rounded-lg shadow-xl'>
                thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProductPage
