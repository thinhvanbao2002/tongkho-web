import { Button, Modal, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { IImportWarehouse, IPayLoadListImportWarehouse } from './ImportWarehouse.props'
import { importWarehouseServices } from './ImportWarehouseApis'
import { ImportWarehouseForm } from './components/ImportWarehouseForm'
import dayjs from 'dayjs'

export const ImportWarehousePage = () => {
  const [payload, setPayload] = useState<IPayLoadListImportWarehouse>({
    page: 1,
    limit: 10
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IImportWarehouse[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [total, setTotal] = useState(0)

  const columnsListImportWarehouse = [
    {
      title: 'Tên nhà kho',
      dataIndex: 'warehouse',
      key: 'warehouse',
      render: (value: any) => value?.warehouse_name
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (value: any) => value?.name
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (value: any) => value?.supplier_name || 'N/A'
    },
    {
      title: 'Người nhập',
      dataIndex: 'staff_name',
      key: 'staff_name'
    },
    {
      title: 'Thời gian nhập',
      dataIndex: 'import_date',
      key: 'import_date',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'quantity',
      key: 'quantity'
      // render: (value: any[]) => value.length
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => (
        <span className={`${value === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
          {value === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
        </span>
      )
    }
  ]

  const handleGetListImportWarehouse = async () => {
    setLoading(true)
    try {
      const res = await importWarehouseServices.get(payload)
      console.log('🚀 ~ handleGetListImportWarehouse ~ res:', res)
      setData(res.data)
      setTotal(res.data.length)
    } catch (error) {
      console.log('🚀 ~ handleGetListImportWarehouse ~ error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetListImportWarehouse()
  }, [payload.page, payload.limit])

  const handleSubmit = async (value: any) => {
    try {
      await importWarehouseServices.post(value)
      message.success('Nhập kho thành công')
      setIsOpenModal(false)
      handleGetListImportWarehouse()
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error)
      message.error('Nhập kho thất bại')
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold'>Nhập kho</h1>
        <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsOpenModal(true)}>
          Nhập kho mới
        </Button>
      </div>

      <Table
        columns={columnsListImportWarehouse}
        dataSource={data}
        loading={loading}
        rowKey='id'
        pagination={{
          current: payload.page,
          pageSize: payload.limit,
          total: total,
          onChange: (page, pageSize) => {
            setPayload({
              ...payload,
              page,
              limit: pageSize
            })
          }
        }}
      />

      <Modal title='Nhập kho mới' open={isOpenModal} onCancel={() => setIsOpenModal(false)} footer={null} width={1000}>
        <ImportWarehouseForm onFinish={handleSubmit} onClose={() => setIsOpenModal(false)} />
      </Modal>
    </div>
  )
}

export default ImportWarehousePage
