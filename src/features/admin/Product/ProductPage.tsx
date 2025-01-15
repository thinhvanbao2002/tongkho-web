/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import FilterProduct from './components/FilterProduct'
import { isNil } from 'lodash'
import { TooltipCustom } from 'common/components/tooltip/ToolTipComponent'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ShowConfirm } from 'common/components/Alert'
import { Button, Row, Spin, Tag } from 'antd'
import { Styled } from 'styles/stylesComponent'
import { IColumnAntD } from 'common/constants/interface'
import { IProduct } from './Product.props'
import { getDataSource, openNotification } from 'common/utils'
import { productServices } from './ProductApis'
import { useNavigate } from 'react-router-dom'
import { ADMIN_PATH } from 'common/constants/paths'

function ProductPage() {
  const [payload, setPayload] = useState<any>({
    page: 1,
    limit: 10,
    q: '',
    status: 1,
    to_date: '',
    from_date: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [products, setProducts] = useState<Array<IProduct>>([])
  const [count, setCount] = useState<number>(12)
  console.log('🚀 ~ ProductPage ~ count:', count)
  const navigate = useNavigate()

  const columnsListCategory: IColumnAntD[] = [
    {
      title: 'STT',
      key: 'STT',
      dataIndex: 'STT',
      width: 20
    },
    {
      title: 'Mã sản phẩm',
      key: 'product_code',
      dataIndex: 'product_code'
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => (record.s === 1 ? <Tag color={'blue'}>{text}</Tag> : <Tag color={'red'}>{text}</Tag>)
    },
    {
      title: 'Danh mục',
      key: 'category',
      dataIndex: 'category'
    },
    {
      title: 'Giá tiền',
      key: 'price',
      dataIndex: 'price'
    },
    // {
    //   title: 'Loại sản phẩm',
    //   key: 'productType',
    //   dataIndex: 'productType'
    // },
    {
      title: 'Số lượng còn',
      key: 'quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Số lượng đã bán',
      key: 'sold',
      dataIndex: 'sold'
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt'
    },
    {
      width: 80,
      title: 'Thao tác',
      key: 'tt',
      dataIndex: 'tt',
      render: (value: number, record: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <TooltipCustom
              title={'Cập nhật'}
              children={
                <Button
                  type={'text'}
                  className={'btn-success-text'}
                  icon={<EditOutlined />}
                  onClick={() => handleNavigateEditProduct(record)}
                />
              }
            />
            <ShowConfirm
              placement='bottomLeft'
              onConfirm={() => handleRemoveAccount(record)}
              confirmText={'Xóa'}
              title={'Bạn có chắc chắn muốn xóa?'}
            >
              <TooltipCustom
                title='Xóa'
                children={<Button type='text' className={'btn-delete-text'} icon={<DeleteOutlined />} />}
              />
            </ShowConfirm>
          </div>
        )
      }
    }
  ]

  const handleGetProducts = async (payload?: any) => {
    try {
      const res = await productServices.get(payload)
      setProducts(getDataSource(res?.data, 1))
      setCount(res?.meta?.item_count)
    } catch (error) {
      console.log('🚀 ~ handleGetAccount ~ error:', error)
    }
  }

  const handleRemoveAccount = async (record: any) => {
    try {
      const res = await productServices.delete(record?.id)
      if (res) openNotification('success', 'Thành công', 'Xóa sản phẩm thành công')
      handleGetProducts()
    } catch (error) {
      console.log('🚀 ~ handleRemoveAccount ~ error:', error)
      openNotification('success', 'Thành công', 'Xóa sản phẩm thất bại')
    }
  }

  useEffect(() => {
    handleGetProducts(payload)
  }, [payload])

  const handleFilterProduct = useCallback(
    (value: any) => {
      if (!isNil(value.status)) {
        setPayload({
          ...payload,
          status: value?.status,
          page: 1
        })
      }
      if (!isNil(value?.date)) {
        setPayload({
          ...payload,
          from_date: value?.date.split(',')[0],
          to_date: value?.date.split(',')[1]
        })
      }
      if (!isNil(value?.search)) {
        setPayload({
          ...payload,
          q: value?.search
        })
      }
      if (!isNil(value?.product_type)) {
        setPayload({
          ...payload,
          product_status: value?.product_type
        })
      }
      if (!isNil(value?.categoryId)) {
        setPayload({
          ...payload,
          branch: value?.categoryId
        })
      }
      if (!isNil(value.sortBy)) {
        setPayload({
          ...payload,
          order: value?.sortBy
        })
      }
    },
    [payload]
  )

  const handleNavigateEditProduct = (record: any) => {
    navigate('/ad-ce-product/', { state: { record: { ...record } } })
  }

  const handleNavigateAddProduct = () => {
    navigate(ADMIN_PATH.CREATE_UPDATE_PRODUCT, { state: {} })
  }
  return (
    <>
      <FilterProduct onChangeValue={handleFilterProduct} />
      <Row className='mb-2 flex justify-end mt-2'>
        <Button type='primary' onClick={handleNavigateAddProduct}>
          Thêm mới
        </Button>
        <Button className='ml-2' type='primary'>
          Xuất Excel
        </Button>
      </Row>
      <Spin spinning={isLoading}>
        <Styled.TableStyle
          bordered
          columns={columnsListCategory}
          dataSource={products}
          pagination={{
            onChange: (page) => {
              setIsLoading(true)
              setTimeout(() => {
                setPayload({ ...payload, page: page })
                setIsLoading(false)
              }, 200)
            },
            total: count,
            current: payload.page
          }}
        />
      </Spin>
    </>
  )
}

export default ProductPage
