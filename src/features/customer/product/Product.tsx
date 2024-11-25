/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Layout, Checkbox, Slider, Divider, Input, Pagination, Spin } from 'antd'
import CartComponent from 'common/components/cart/Cart'

const { Sider, Content } = Layout

const siderStyle = {
  padding: '20px',
  background: '#f0f2f5'
}

const contentStyle = {
  padding: '20px'
}

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
  },
  {
    name: 'Tên Sản Phẩm 1',
    price: '100,000',
    imageUrl: 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
  },
  {
    name: 'Tên Sản Phẩm 2',
    price: '200,000',
    imageUrl: 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
  },
  {
    name: 'Tên Sản Phẩm 1',
    price: '100,000',
    imageUrl: 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
  },
  {
    name: 'Tên Sản Phẩm 2',
    price: '200,000',
    imageUrl: 'https://bizweb.dktcdn.net/100/415/697/products/ak058.png?v=1701405312903'
  },
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

function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const categories = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Toys']

  const handleCategoryChange = (checkedValues: any) => {
    setSelectedCategories(checkedValues)
  }

  const handlePriceChange = (value: any) => {
    setPriceRange(value)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 300)
  }, [])

  return (
    <>
      <Layout className='border-t-2'>
        <Sider width='20%' className='bg-baseBackground p-5'>
          <h3 className='text-custom-xl'>Bộ Lọc Sản Phẩm</h3>
          <Divider orientation='left'>Tìm kiếm</Divider>
          <Input placeholder='Nội dung tìm kiếm..' />
          <Divider orientation='left'>Danh Mục</Divider>
          <Checkbox.Group options={categories} onChange={handleCategoryChange} />

          <Divider orientation='left'>Khoảng Giá</Divider>
          <Slider
            range
            min={0}
            max={10000000}
            defaultValue={priceRange}
            onChange={handlePriceChange}
            tooltip={{ formatter: (value) => `${value}đ` }}
          />

          <Divider />
          {/* <Button
            className='text-white bg-blue-500 bg-black text-while hover:bg-hover px-4 py-2 rounded-2xl'
            type='primary'
            onClick={applyFilters}
          >
            Áp Dụng Bộ Lọc
          </Button> */}
        </Sider>
        <Spin spinning={isLoading}>
          <Content style={contentStyle}>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {arr.map((item, index) => (
                <CartComponent key={index} data={item} />
              ))}
            </div>
            <Pagination className='mt-10' align='center' defaultCurrent={1} total={50} />
          </Content>
        </Spin>
      </Layout>
    </>
  )
}

export default ProductPage
