import { Button, Row, Spin } from 'antd'
import FilterCategory from './components/FilterCategory'
import { useCallback, useEffect, useState } from 'react'
import { IColumnAntD } from 'common/constants/interface'
import { TooltipCustom } from 'common/components/tooltip/ToolTipComponent'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ShowConfirm } from 'common/components/Alert'
import { Styled } from 'styles/stylesComponent'
import ModalComponent from 'common/components/modal/Modal'
import { ICategory, IPayLoadLisCategory } from './Category.props'
import { categoryServices } from './CategoryApis'
import { getDataSource, openNotification } from 'common/utils'
import { AddEditCategory } from './components/AddEditCategory'

function CategoryPage() {
  const [payload, setPayload] = useState<IPayLoadLisCategory>({
    page: 1,
    take: 10,
    q: '',
    status: 1,
    to_date: '',
    from_date: ''
  })
  const [categories, setCategory] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [count, setCount] = useState<number>(12)
  const [rowSelected, setRowSelected] = useState<ICategory>()

  const columnsListCategory: IColumnAntD[] = [
    {
      title: 'STT',
      key: 'STT',
      dataIndex: 'STT',
      width: 20
    },
    {
      title: 'Tên danh mục',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status'
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
                  onClick={() => handleEditAccount(record)}
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

  const handleGetCategories = async (payload?: any) => {
    try {
      const res = await categoryServices.get(payload)
      setCategory(getDataSource(res?.data, 1))
      setCount(res?.meta?.item_count)
    } catch (error) {
      console.log('🚀 ~ handleGetAccount ~ error:', error)
    }
  }

  useEffect(() => {
    handleGetCategories(payload)
  }, [payload])

  const handleFilter = useCallback(
    (value: any) => {
      if (value?.status !== null || value?.status !== undefined) {
        setPayload({
          ...payload,
          status: value.status,
          page: 1
        })
      }
      if (value?.date) {
        setPayload({
          ...payload,
          from_date: value?.date.split(',')[0],
          to_date: value?.date.split(',')[1]
        })
      }
      if (value?.search) {
        setPayload({
          ...payload,
          q: value?.search
        })
      }
    },
    [payload]
  )

  const handleSubmit = async (value: any) => {
    setIsLoading(true)
    const payLoadAccount = {
      id: rowSelected?.id,
      name: value?.name,
      status: value?.status
    }
    let res
    try {
      if (rowSelected?.id) {
        res = await categoryServices.patch(payLoadAccount)
      } else {
        res = await categoryServices.post({ ...payLoadAccount })
      }

      if (res.status == 1) {
        if (rowSelected) {
          console.log('1')

          openNotification('success', 'Thành công', 'Cập nhật thành công')
        } else {
          console.log('2')

          openNotification('success', 'Thành công', 'Thêm mới thành công')
        }
        setIsLoading(false)
        setModalVisible(false)
        handleGetCategories()
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error)
    }
  }

  const handleEditAccount = useCallback(async (record: any) => {
    console.log('🚀 ~ handleEditAccount ~ record:', record)
    setModalVisible(true)
    setRowSelected(record)
  }, [])

  const handleRemoveAccount = useCallback(async (record: any) => {
    try {
      const res = await categoryServices.delete(record?.id)
      if (res) {
        openNotification('success', 'Thành công', 'Xóa danh mục thành công')
        setIsLoading(true)
        handleGetCategories()
        setIsLoading(false)
      }
    } catch (error) {
      console.log('🚀 ~ handleRemoveAccount ~ error:', error)
    }
  }, [])

  const handleClose = useCallback(() => {
    setModalVisible(false)
    setRowSelected(undefined)
  }, [])

  return (
    <>
      <Row gutter={[15, 6]} className='mb-2'>
        <FilterCategory onChangeValue={handleFilter} />
      </Row>
      <Row className='mb-2 flex justify-end'>
        <Button
          type='primary'
          onClick={() => {
            setModalVisible(true)
            setTitle('Thêm mới danh mục')
            // setTextButton('Thêm mới')
          }}
        >
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
          dataSource={categories}
          pagination={{
            onChange: (page) => {
              setIsLoading(true)
              setTimeout(() => {
                setPayload({ ...payload, page: page })
                setIsLoading(false)
              }, 200)
            },
            total: count,
            current: payload.page,
            pageSize: payload.take
          }}
        />
      </Spin>
      <ModalComponent
        loading={isLoading}
        title={title}
        width={500}
        modalVisible={modalVisible}
        children={<AddEditCategory onFinish={handleSubmit} onClose={handleClose} rowSelected={rowSelected} />}
      />
    </>
  )
}

export default CategoryPage
