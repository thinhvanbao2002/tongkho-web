/* eslint-disable @typescript-eslint/no-unused-vars */
import { Carousel, Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { useCallback, useEffect, useState } from 'react'
import { productServices } from '../product/productApis'
import { homeServices } from './homeApis'
import CardComponent from 'common/components/cart/Cart.tsx'
import { useNavigate } from 'react-router'
import { USER_PATH } from 'common/constants/paths'
interface urlBackground {
  url: string
}
const contentStyle: React.CSSProperties = {
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  // background: 'red',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const backGrounds: Array<urlBackground> = [
  {
    url: '/banner1.png'
  },
  {
    url: '/banner2.png'
  },
  {
    url: '/banner3.png'
  }
]

function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [payload, setPayload] = useState<any>({
    page: 1,
    take: 10,
    q: '',
    to_date: '',
    from_date: ''
  })

  const handleGetProducts = useCallback(async (payload: any) => {
    try {
      const res = await productServices.get(payload)
      setProducts(res.data)
    } catch (error) {
      console.log('🚀 ~ handleGetProducts ~ error:', error)
    }
  }, [])

  const handleGetCategory = useCallback(async (payload: any) => {
    try {
      const res = await homeServices.getCategory(payload)
      setCategories(res.data)
    } catch (error) {
      console.log('🚀 ~ handleGetCategory ~ error:', error)
    }
  }, [])

  useEffect(() => {
    handleGetProducts(payload)
    handleGetCategory(payload)
  }, [payload])

  return (
    <>
      <Carousel className='h-[700px]' autoplay>
        {backGrounds.map((item, index) => (
          <div>
            <div key={index} style={{ ...contentStyle, backgroundImage: `url(${item.url})` }}></div>
          </div>
        ))}
      </Carousel>
      <div>
        <Layout>
          <Header className='flex items-center justify-center text-custom-xs h-28 bg-baseBackground'>
            {categories &&
              categories.length > 0 &&
              categories.map((item: any) => (
                <div
                  onClick={() => {
                    navigate(USER_PATH.PRODUCT, { state: { category_id: item.id } })
                  }}
                  className='p-3 cursor-pointer hover:text-hover'
                >
                  {item?.name}
                </div>
              ))}
          </Header>

          <Content className='p-8 bg-gray-100'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
              {products && products.length && products.map((item, index) => <CardComponent key={index} data={item} />)}
            </div>
            {/* <Pagination className='mt-10' align='center' defaultCurrent={1} total={50} /> */}
          </Content>
        </Layout>
      </div>
    </>
  )
}

export default HomePage
