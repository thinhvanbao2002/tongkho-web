/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row, Spin, Tag } from 'antd'
import FilterBlog from './components/FilterBlog'
import { TooltipCustom } from 'common/components/tooltip/ToolTipComponent'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ShowConfirm } from 'common/components/Alert'
import { Styled } from 'styles/stylesComponent'
import { IColumnAntD } from 'common/constants/interface'
import { useCallback, useEffect, useState } from 'react'
import { IBlog } from './Blog.props'
import { blogServices } from './BlogApis'
import { getDataSource, openNotification, openNotificationError } from 'common/utils'
import { isNil } from 'lodash'
import { useNavigate } from 'react-router'
import { ADMIN_PATH } from 'common/constants/paths'

function BlogPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [payload, setPayload] = useState<any>({
    page: 1,
    take: 10,
    q: '',
    to_date: '',
    from_date: ''
  })
  const [blogs, setBlogs] = useState<Array<IBlog>>([])
  const [count, setCount] = useState<number>(0)
  const columnsListCategory: IColumnAntD[] = [
    {
      title: 'STT',
      key: 'STT',
      dataIndex: 'STT',
      width: 20
    },
    {
      title: 'Tiêu đề bài viết',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => (record.s == 1 ? <Tag color={'blue'}>{text}</Tag> : <Tag color={'red'}>{text}</Tag>)
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

  const handleNavigateEditProduct = (record: any) => {
    navigate('/ad-ce-blog', { state: { record: { ...record } } })
  }

  const handleNavigateAddProduct = () => {
    navigate(ADMIN_PATH.CREATE_UPDATE_BLOG, { state: {} })
  }

  const getBlogList = async (value?: any) => {
    try {
      const res = await blogServices.get(value)
      setBlogs(getDataSource(res?.data, 1))
      setCount(res?.meta?.item_count)
    } catch (error) {
      console.log('🚀 ~ getBlogList ~ error:', error)
    }
  }

  const handleRemoveAccount = async (value: any) => {
    try {
      const res = await blogServices.delete(value?.id)
      if (res) {
        openNotification('success', 'Thành công', 'Xóa bài viết thành công')
        getBlogList()
      }
    } catch (error) {
      openNotificationError(error)
    }
  }

  const handleFilterBlog = useCallback(
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

  useEffect(() => {
    getBlogList(payload)
  }, [payload])

  return (
    <>
      <FilterBlog onChangeValue={handleFilterBlog} />
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
          dataSource={blogs}
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
    </>
  )
}

export default BlogPage
