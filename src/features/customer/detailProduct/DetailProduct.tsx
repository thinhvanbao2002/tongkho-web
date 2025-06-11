import { Image, Select, InputNumber } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { productServices } from '../product/productApis'
import { formatPrice, openNotification, openNotificationError } from 'common/utils'
import RelatedProducts from 'features/admin/Product/components/RelatedProducts'
import { USER_PATH } from 'common/constants/paths'
import Comment from '../comment/Comment'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

function DetailProductPage() {
  const [product, setProduct] = useState<any>({})
  const [selectedImage, setSelectedImage] = useState<string>('')
  const navigate = useNavigate()
  const [relatedProducts, setRelatedProducts] = useState<Array<any>>([])
  const [payload, setPayload] = useState<any>({
    page: 1,
    take: 999,
    brand: null
  })
  const [cartPayload, setCartPayload] = useState<any>({
    size: 'l',
    product_number: 1,
    product_id: null
  })
  const { id } = useParams()

  const getProductById = useCallback(async (id: any) => {
    try {
      const res = await productServices.getById(id)
      setProduct(res?.data)
    } catch (error) {
      console.log('🚀 ~ getProductById ~ error:', error)
    }
  }, [])

  const getProductsByCategory = useCallback(async (payload: any) => {
    try {
      const res = await productServices.get(payload)
      setRelatedProducts(res?.data)
    } catch (error) {
      console.log('🚀 ~ getProductById ~ error:', error)
    }
  }, [])

  const handleRelatedProductClick = useCallback(
    (productId: string) => {
      navigate(`${USER_PATH.PRODUCT_DETAIL}/${productId}`)
    },
    [navigate]
  )

  const handleSetCartPayload = (key: any, value: any) => {
    try {
      setCartPayload((prev: any) => ({
        ...prev,
        [key]: value
      }))
    } catch (error) {
      console.log('🚀 ~ handleSetCartPayload ~ error:', error)
    }
  }
  const handleAddToCart = useCallback(async (payload: any) => {
    try {
      const res = await productServices.addToCart(payload)
      if (res) {
        openNotification('success', 'Thành công', 'Thêm sản phẩm vào giỏ hàng thành công!')
      }
    } catch (error) {
      openNotificationError(error)
    }
  }, [])

  useEffect(() => {
    getProductById(id)
    window.scrollTo({
      top: 0, // Vị trí trên cùng
      behavior: 'smooth' // Cuộn mượt
    })
  }, [id, getProductById, handleRelatedProductClick])

  useEffect(() => {
    if (product?.category_id) {
      setPayload((prev: any) => ({
        ...prev,
        brand: product?.category_id
      }))
    }
  }, [product, handleRelatedProductClick])

  useEffect(() => {
    if (payload.brand) {
      getProductsByCategory(payload)
    }
  }, [payload])

  useEffect(() => {
    setCartPayload((prev: any) => ({
      ...prev,
      product_id: product?.id
    }))
  }, [product])

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image)
    }
  }, [product])

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='w-full h-[50px] pl-20 pr-20 bg-white shadow-sm'>
        <div className='w-full border-b-2 h-[50px] flex items-center justify-start text-custom-sm'>
          <span className='text-gray-600'>Sản phẩm</span>
          <div className='border-r-2 border-gray-200 ml-2 mr-2 w-[1px] h-[16px]'></div>
          <span className='text-gray-600'>{product.category?.name}</span>
          <div className='border-r-2 border-gray-200 ml-2 mr-2 w-[1px] h-[16px]'></div>
          <span className='font-semibold text-black'>{product?.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full pl-20 pr-20 pt-10 pb-20 flex sm:flex-col md:flex-col lg:flex-row gap-8'>
        {/* Product Images */}
        <div className='p-6 sm:w-full md:w-full lg:w-[60%] bg-white rounded-lg shadow-sm'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full aspect-square overflow-hidden rounded-lg'
          >
            <Image
              width={'100%'}
              height={'100%'}
              className='object-cover'
              src={selectedImage || product.image}
              preview={false}
            />
          </motion.div>

          <div className='flex mt-4 gap-2 overflow-x-auto pb-2'>
            {product.product_photo?.map((p: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  selectedImage === p.url ? 'border-black' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(p.url)}
              >
                <Image width={100} height={100} className='object-cover' src={p?.url} preview={false} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='w-full p-6 lg:w-[40%] bg-white rounded-lg shadow-sm'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className='uppercase text-2xl font-bold text-gray-800'>{product?.name}</h2>

            <div className='flex items-center justify-between text-sm mt-4 text-gray-600'>
              <div className='flex items-center'>
                <span>Mã sản phẩm:</span>
                <h3 className='font-semibold ml-2'>{product?.product_code}</h3>
              </div>
              <div className='flex items-center'>
                <span>Tình trạng:</span>
                <h3 className='font-semibold ml-2 text-green-600'>Còn hàng</h3>
              </div>
            </div>

            <div className='mt-6'>
              <h2 className='font-extrabold text-3xl text-money'>{formatPrice(product.price)} VND</h2>
            </div>

            <div className='w-full border-t border-gray-200 my-6'></div>

            <div className='mt-5'>
              <p className='text-sm text-gray-600 leading-relaxed'>{product.introduce}</p>
            </div>

            <div className='w-full border-t border-gray-200 my-6'></div>

            <div className='flex items-center justify-between gap-4 mt-6'>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>SIZE</label>
                <Select
                  defaultValue='l'
                  className='w-full'
                  onChange={(value) => handleSetCartPayload('size', value)}
                  options={[
                    { value: 's', label: 'S' },
                    { value: 'm', label: 'M' },
                    { value: 'l', label: 'L' },
                    { value: 'xl', label: 'XL' },
                    { value: '2xl', label: '2XL' },
                    { value: '3xl', label: '3XL' }
                  ]}
                />
              </div>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>SỐ LƯỢNG</label>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  className='w-full'
                  onChange={(value) => handleSetCartPayload('product_number', value)}
                />
              </div>
            </div>

            <div className='w-full border-t border-gray-200 my-6'></div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddToCart(cartPayload)}
              style={{color: '#fff'}}
              className='
                w-full py-3 px-6 rounded-lg
                bg-primary hover:bg-primary-dark
                !text-white font-medium
                transition-colors duration-300
                flex items-center justify-center gap-2
              '
            >
              <ShoppingCart className='w-5 h-5' />
              Thêm vào giỏ hàng
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      <div className='mb-10'>
        <RelatedProducts productList={relatedProducts} handleClick={handleRelatedProductClick} />
      </div>

      {/* Comments */}
      <div className='mt-20'>
        <Comment id={id} reviews={product.product_reviews} getProduct={getProductById} />
      </div>
    </div>
  )
}

export default DetailProductPage
