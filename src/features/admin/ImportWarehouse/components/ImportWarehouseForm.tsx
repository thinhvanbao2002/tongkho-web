import { Button, Col, DatePicker, Form, Input, Row, Select, InputNumber } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { IImportProduct } from '../ImportWarehouse.props'
import { productServices } from '../../Product/ProductApis'
import { warehouseServices } from '../../Warehouse/warehouseApis'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

interface IImportWarehouseForm {
  onFinish?: (value: any) => void
  onClose?: () => void
}

export const ImportWarehouseForm = ({ onFinish, onClose }: IImportWarehouseForm) => {
  const [form] = Form.useForm()
  const [products, setProducts] = useState<IImportProduct[]>([])
  const [productOptions, setProductOptions] = useState<any[]>([])
  const [warehouseOptions, setWarehouseOptions] = useState<any[]>([])
  const currentUser = useSelector((state: any) => state.login.user)

  const handleGetProducts = async () => {
    try {
      const res = await productServices.get({
        page: 1
      })
      setProductOptions(
        res.data.map((item: any) => ({
          label: item.name,
          value: item.id
        }))
      )
    } catch (error) {
      console.log('🚀 ~ handleGetProducts ~ error:', error)
    }
  }

  const handleGetWarehouses = async () => {
    try {
      const res = await warehouseServices.get({
        page: 1,
        status: 1
      })
      setWarehouseOptions(
        res.data.map((item: any) => ({
          label: item.warehouse_name,
          value: item.id
        }))
      )
    } catch (error) {
      console.log('🚀 ~ handleGetWarehouses ~ error:', error)
    }
  }

  useEffect(() => {
    handleGetProducts()
    handleGetWarehouses()
    if (currentUser) {
      form.setFieldsValue({
        staff_name: currentUser.name,
        staff_id: currentUser.id
      })
    }
  }, [currentUser])

  const handleAddProduct = () => {
    setProducts([...products, { product_id: 0, product_name: '', quantity: 1, note: '' }])
  }

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  const handleProductChange = (value: number, index: number) => {
    const newProducts = [...products]
    const selectedProduct = productOptions.find((item) => item.value === value)
    newProducts[index] = {
      ...newProducts[index],
      product_id: value,
      product_name: selectedProduct?.label || ''
    }
    setProducts(newProducts)
  }

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      staff_id: currentUser.id,
      import_date: values.import_date.format('YYYY-MM-DD HH:mm:ss'),
      products: products
    }
    onFinish?.(payload)
  }

  return (
    <Form
      form={form}
      name='importWarehouse'
      labelAlign='left'
      onFinish={handleSubmit}
      scrollToFirstError
      layout='vertical'
      initialValues={{
        import_date: dayjs(),
        staff_name: currentUser?.name
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name='staff_name'
            label='Họ tên người nhập'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên người nhập'
              }
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='warehouse_id'
            label='Kho nhập'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn kho nhập'
              }
            ]}
          >
            <Select options={warehouseOptions} placeholder='Chọn kho nhập' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name='import_date'
            label='Thời gian nhập'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn thời gian nhập'
              }
            ]}
          >
            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <div className='mb-4'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-lg font-semibold'>Danh sách sản phẩm</h3>
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAddProduct}>
            Thêm sản phẩm
          </Button>
        </div>

        {products.map((product, index) => (
          <div key={index} className='mb-4 p-4 border rounded-lg'>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label='Sản phẩm'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn sản phẩm'
                    }
                  ]}
                >
                  <Select
                    options={productOptions}
                    onChange={(value) => handleProductChange(value, index)}
                    placeholder='Chọn sản phẩm'
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label='Số lượng'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số lượng'
                    }
                  ]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      const newProducts = [...products]
                      newProducts[index].quantity = value || 1
                      setProducts(newProducts)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label='Ghi chú'>
                  <Input
                    onChange={(e) => {
                      const newProducts = [...products]
                      newProducts[index].note = e.target.value
                      setProducts(newProducts)
                    }}
                    placeholder='Nhập ghi chú'
                  />
                </Form.Item>
              </Col>
              <Col span={2} className='flex items-end'>
                <Button type='text' danger icon={<DeleteOutlined />} onClick={() => handleRemoveProduct(index)} />
              </Col>
            </Row>
          </div>
        ))}
      </div>

      <Row gutter={24}>
        <Col span={12}> </Col>
        <Col span={12} className='flex items-center justify-end'>
          <Button danger onClick={onClose}>
            Thoát
          </Button>
          <Button htmlType='submit' className='btn-confirm' style={{ marginLeft: '10px' }}>
            Nhập kho
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
