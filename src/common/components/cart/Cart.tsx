import { Image } from 'antd'
import { USER_PATH } from 'common/constants/paths'
import { formatPrice, openNotification, openNotificationError } from 'common/utils'
import { PRODUCT_VALUES } from 'features/customer/product/product.constants.'
import { ICartPayload, productServices } from 'features/customer/product/productApis'
import { useNavigate } from 'react-router'

interface ProductData {
  id: string
  name: string
  image?: string
  price: number
  product_type: keyof typeof PRODUCT_VALUES
}

function CardComponent({ data }: { data: ProductData }) {
  const navigate = useNavigate()

  const handleAddToCart = async (payload: ICartPayload) => {
    try {
      const res = await productServices.addToCart(payload)
      if (res) {
        openNotification('success', 'Thành công', 'Thêm sản phẩm vào giỏ hàng thành công!')
      }
    } catch (error) {
      openNotificationError(error)
    }
  }

  return (
    <>
      <div className='group'>
        <div className='relative overflow-hidden block'>
          <Image
            height={'100%'}
            onClick={() => {
              console.log('>>>>>>')

              navigate(`${USER_PATH.PRODUCT_DETAIL}/${data?.id}`)
            }}
            src={data.image ? data?.image : 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'}
            alt='Product'
            className='w-full object-cover block'
          />
          <div className='absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform transition-all '>
            <button
              onClick={() => {
                navigate(`${USER_PATH.PRODUCT_DETAIL}/${data?.id}`)
              }}
              className='text-while bg-black px-6 py-2 hover:bg-money absolute bottom-0 left-0 ml-16 uppercase font-medium  transform transition-all'
            >
              Mua ngay
            </button>
            <button
              onClick={() => {
                handleAddToCart({
                  product_id: Number(data.id),
                  product_number: 1
                })
              }}
              className='text-while px-4 py-2 absolute bottom-0 right-8'
            >
              <svg className='w-6' xmlns='http://www.w3.org/2000/svg ' viewBox='0 0 576 512' fill='#000'>
                <path d='M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
              </svg>
            </button>
          </div>
        </div>
        <div
          className='text-center cursor-pointer'
          onClick={() => {
            navigate(`${USER_PATH.PRODUCT_DETAIL}/${data?.id}`)
          }}
        >
          <h3 className='text-custom-xs font-thin text-money italic mt-2'>{PRODUCT_VALUES[data?.product_type].text}</h3>
          <h3 className='text-custom-xs font-semibold  mt-2'>{data?.name}</h3>
          <h2 className='text-custom-sm font-semibold mt-2 '>{formatPrice(data?.price)} VND</h2>
        </div>
      </div>
    </>
  )
}

export default CardComponent
