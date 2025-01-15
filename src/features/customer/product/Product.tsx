import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Layout, Spin, Pagination } from 'antd'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { productServices } from './productApis'
import CardComponent from 'common/components/cart/Cart'
import { formatPrice } from 'common/utils'
import { homeServices } from '../home/homeApis'
import { PRODUCT_VALUES } from './product.constants.'
import NodataComponent from 'common/components/Nodata/NoData'
import { useLocation } from 'react-router'

const { Sider, Content } = Layout

const contentStyle = {
  padding: '20px'
}

const productPriceListOptions = [
  { label: `< ${formatPrice(200000)}`, range: [0, 200000] },
  { label: `${formatPrice(200000)} - ${formatPrice(500000)}`, range: [200000, 500000] },
  { label: `${formatPrice(500000)} - ${formatPrice(700000)}`, range: [500000, 700000] },
  { label: `${formatPrice(700000)} - ${formatPrice(1000000)}`, range: [700000, 1000000] },
  { label: `> ${formatPrice(1000000)}`, range: [1000000, Infinity] }
]

function ProductPage() {
  const [isProductTypesOpen, setIsProductTypesOpen] = useState<boolean>(true)
  const [isProductPriceOpen, setIsPriceOpen] = useState<boolean>(true)
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<any>([])
  const [categories, setCategories] = useState<Array<any>>([])
  const [itemCount, setItemCount] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<number>(null)
  const location = useLocation()
  const { state } = location || {}
  const brand = state?.category_id || {}
  const [payload, setPayload] = useState<any>({
    page: 1,
    take: 20,
    q: '',
    to_date: '',
    from_date: '',
    status: null,
    price_range: null,
    brand: null,
    product_type: null
  })
  console.log('🚀 ~ ProductPage ~ payload:', payload)

  const handleGetProduct = useCallback(async (payload: any) => {
    try {
      setIsLoading(true)
      const res = await productServices.get(payload)
      setItemCount(res.meta.item_count)
      setProducts(res?.data)
      setIsLoading(false)
    } catch (error) {
      console.error('🚀 ~ handleGetProduct ~ error:', error)
      setIsLoading(false)
    }
  }, [])

  const handleGetcategory = useCallback(async () => {
    try {
      const res = await homeServices.getCategory()
      setCategories(res?.data)
    } catch (error) {
      console.error('🚀 ~ handleGetcategory ~ error:', error)
    }
  }, [payload])

  const productTypeListOptions = Object.entries(PRODUCT_VALUES).map(([value, { text }]) => ({
    label: text,
    value
  }))

  const toggleMenu = (key: string) => {
    switch (key) {
      case 'status':
        setIsProductTypesOpen(!isProductTypesOpen)
        break
      case 'price':
        setIsPriceOpen(!isProductPriceOpen)
        break
      case 'category':
        setIsCategoryOpen(!isCategoryOpen)
        break
      default:
        break
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    if (key === 'product_type') {
      setPayload((prev: any) => ({
        page: prev.page,
        take: prev.take,
        [key]: value
      }))
    } else if (key === 'price_range') {
      setPayload((prev: any) => ({
        page: prev.page,
        take: prev.take,
        [key]: value
      }))
    } else if (key === 'category') {
      setPayload((prev: any) => ({
        page: prev.page,
        take: prev.take,
        [key]: value
      }))
    } else if (key === 'page') {
      setPayload((prev: any) => ({
        ...prev,
        [key]: value
      }))
    } else if (key === 'brand') {
      setPayload((prev: any) => ({
        page: prev.page,
        take: prev.take,
        [key]: value
      }))
    }
  }
  useEffect(() => {
    if (categoryId) {
      const updatedPayload = {
        ...payload,
        brand: categoryId
      }
      setPayload(updatedPayload)
      handleGetProduct(updatedPayload) // Gọi API trực tiếp sau khi cập nhật payload
    }
  }, [categoryId])

  useEffect(() => {
    handleGetProduct(payload)
    console.log('getdata')
  }, [payload])

  useEffect(() => {
    handleGetcategory()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setCategoryId(brand)
  }, [])

  return (
    <>
      <Layout className='border-t-2'>
        <Sider width='20%' className='bg-baseBackground p-5 text-custom-sm font-semibold'>
          {/* Trạng thái */}
          <div>
            <h3
              onClick={() => toggleMenu('status')}
              className='uppercase cursor-pointer flex items-center justify-between pt-2 pb-2 text-money hover:text-primary '
            >
              <p>Trạng thái</p>
              <span>{isProductTypesOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
            </h3>

            <ul className='text-custom-xs font-light cursor-pointer'>
              {isProductTypesOpen ? (
                productTypeListOptions &&
                productTypeListOptions.length &&
                productTypeListOptions.map((p, index) => (
                  <li
                    key={index}
                    className='pl-4 pr-4 pt-2 pb-2 rounded-md hover:bg-[#f4f2f2]'
                    onClick={() => handleFilterChange('product_type', p.value)}
                  >
                    {p.label}
                  </li>
                ))
              ) : (
                <Fragment />
              )}
            </ul>
          </div>

          {/* Giá tiền */}
          <div>
            <h3
              onClick={() => toggleMenu('price')}
              className='uppercase cursor-pointer flex items-center justify-between pt-2 pb-2 text-money hover:text-primary '
            >
              <p>Giá tiền</p>
              <span>{isProductPriceOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
            </h3>
            {isProductPriceOpen && (
              <ul className='text-custom-xs font-light cursor-pointer'>
                {productPriceListOptions &&
                  productPriceListOptions.length &&
                  productPriceListOptions.map((p, index) => (
                    <li
                      key={index}
                      className='pl-4 pr-4 pt-2 pb-2 rounded-md hover:bg-[#f4f2f2]'
                      onClick={() => handleFilterChange('price_range', p?.range)}
                    >
                      {p?.label}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Loại sản phẩm */}
          <div>
            <h3
              onClick={() => toggleMenu('category')}
              className='uppercase cursor-pointer flex items-center justify-between pt-2 pb-2 text-money hover:text-primary '
            >
              <p>Loại sản phẩm</p>
              <span>{isCategoryOpen ? <SlArrowUp /> : <SlArrowDown />}</span>
            </h3>
            {isCategoryOpen && (
              <ul className='text-custom-xs font-light cursor-pointer'>
                {categories.map((c, index) => (
                  <li
                    key={index}
                    className='pl-4 pr-4 pt-2 pb-2 rounded-md hover:bg-[#f4f2f2]'
                    onClick={() => handleFilterChange('brand', c.id)}
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Sider>

        {products && products.length ? (
          <Spin wrapperClassName='wrapper-spin' spinning={isLoading}>
            <Content style={contentStyle} className='bg-baseBackground h-[100%]'>
              {products && products.length && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {products.map((item: any, index: number) => (
                    <CardComponent key={index} data={item} />
                  ))}
                </div>
              )}
              <Pagination
                className='mt-10'
                align='center'
                current={payload.page}
                total={itemCount}
                defaultPageSize={payload.take}
                onChange={(page) => handleFilterChange('page', page)}
              />
            </Content>
          </Spin>
        ) : (
          <NodataComponent />
        )}
      </Layout>
    </>
  )
}

export default ProductPage
