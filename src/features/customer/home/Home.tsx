import { Carousel, Layout, Pagination } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import CartComponent from 'common/components/cart/Cart.tsx'
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
    url: 'https://hongnhat.com.vn/wp-content/uploads/2022/10/BANNER-1.jpg'
  },
  {
    url: 'https://cdn.gokisoft.com/uploads/stores/97/2024/01/5.jpg'
  }
]

const arr = [
  {
    name: 'Tên Sản Phẩm 1',
    price: '100,000',
    imageUrl: 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
  },
  {
    name: 'Tên Sản Phẩm 2',
    price: '200,000',
    imageUrl: 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
  }
  // Thêm các sản phẩm khác vào đây
]

function HomePage() {
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
            <div className='p-3 cursor-pointer hover:text-hover'>Áo thu đông</div>
            <div className='p-3 cursor-pointer hover:text-hover'>Áo sơ mi</div>
            <div className='p-3 cursor-pointer hover:text-hover'>Quần đùi</div>
            <div className='p-3 cursor-pointer hover:text-hover'>Quần tây</div>
          </Header>

          <Content className='p-8 bg-gray-100'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
              {arr.map((item, index) => (
                <CartComponent key={index} data={item} />
              ))}
            </div>
            <Pagination className='mt-10' align='center' defaultCurrent={1} total={50} />
          </Content>
        </Layout>
      </div>
    </>
  )
}

export default HomePage
