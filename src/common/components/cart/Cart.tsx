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
    <div className='group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden'>
      {/* Product Image Container */}
      <div className='relative aspect-square overflow-hidden'>
        <Image
          preview={false}
          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500'
          src={data.image || 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'}
          alt={data.name}
          onClick={() => navigate(`${USER_PATH.PRODUCT_DETAIL}/${data?.id}`)}
        />

        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <div className='flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
            <button
              onClick={() => navigate(`${USER_PATH.PRODUCT_DETAIL}/${data?.id}`)}
              className='bg-money text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300 font-medium text-sm uppercase tracking-wider'
            >
              Mua ngay
            </button>
            <button
              onClick={() => handleAddToCart({ product_id: Number(data.id), product_number: 1 })}
              className='bg-money text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300'
            >
              <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='currentColor'>
                <path d='M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-4'>
        <div className='space-y-2'>
          <h3 className='text-sm font-light text-money italic'>{PRODUCT_VALUES[data?.product_type].text}</h3>
          <h3
            className='text-sm font-semibold line-clamp-2 hover:text-money transition-colors duration-300 cursor-pointer'
            onClick={() => navigate(`${USER_PATH.PRODUCT_DETAIL}/${data?.id}`)}
          >
            {data?.name}
          </h3>
          <h2 className='text-lg font-bold text-money'>{formatPrice(data?.price)} VND</h2>
        </div>
      </div>

      {/* Quick View Badge */}
      <div className='absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        Quick View
      </div>
    </div>
  )
}

export default CardComponent
