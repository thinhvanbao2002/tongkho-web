/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row, Spin, Tag } from 'antd'
import FilterBlog from './components/FilterBlog'
import { TooltipCustom } from 'common/components/tooltip/ToolTipComponent'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ShowConfirm } from 'common/components/Alert'
import { Styled } from 'styles/stylesComponent'
import { IColumnAntD } from 'common/constants/interface'
import { useEffect, useState } from 'react'
import { IBlog } from './Blog.props'
import { blogServices } from './BlogApis'
import { getDataSource } from 'common/utils'

function BlogPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [blogs, setBlogs] = useState<Array<IBlog>>([])
  console.log('🚀 ~ BlogPage ~ blogs:', blogs)
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
                  // onClick={() => handleNavigateEditProduct(record)}
                />
              }
            />
            <ShowConfirm
              placement='bottomLeft'
              // onConfirm={() => handleRemoveAccount(record)}
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

  const getBlogList = async (value?: any) => {
    try {
      const res = await blogServices.get(value)
      setBlogs(getDataSource(res?.data, 1))
    } catch (error) {
      console.log('🚀 ~ getBlogList ~ error:', error)
    }
  }

  useEffect(() => {
    getBlogList()
  }, [])

  return (
    <>
      <FilterBlog />
      <Row className='mb-2 flex justify-end mt-2'>
        <Button type='primary'>Thêm mới</Button>
        <Button className='ml-2' type='primary'>
          Xuất Excel
        </Button>
      </Row>
      <Spin spinning={isLoading}>
        <Styled.TableStyle
          bordered
          columns={columnsListCategory}
          dataSource={blogs}
          // pagination={{
          //   onChange: (page) => {
          //     setIsLoading(true)
          //     setTimeout(() => {
          //       setPayload({ ...payload, page: page })
          //       setIsLoading(false)
          //     }, 200)
          //   },
          //   total: count,
          //   current: payload.page
          // }}
        />
      </Spin>
    </>
  )
}

export default BlogPage
