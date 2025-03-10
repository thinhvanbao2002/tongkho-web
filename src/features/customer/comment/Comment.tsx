import TextArea from 'antd/es/input/TextArea'
import './comment.css'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { openNotificationError, timeSince } from 'common/utils'
import { productServices } from '../product/productApis'

interface IPropsComment {
  id: number
  reviews?: []
  getProduct?: any
}

function Comment({ id, reviews, getProduct }: IPropsComment) {
  const [comment, setComment] = useState<string>('')
  const [products, setProduct] = useState<any>([])
  const [productId, setProductId] = useState<number>(null)

  useEffect(() => {
    setProductId(id)
  }, [id])

  useEffect(() => {
    setProduct(reviews)
  }, [reviews])

  const handleSubmit = async () => {
    try {
      await productServices.comment({ comment, product_id: productId })
      setComment('')
      getProduct(id)
    } catch (error) {
      openNotificationError(error)
    }
  }
  return (
    <>
      <div>
        <h3 className='text-custom-xl text-center'>Đánh giá sản phẩm</h3>
        <div className='w-full pl-20 pr-20 pt-4 pb-4 mt-5 '>
          <div className='w-full shadow-block rounded-lg p-10'>
            <div className='flex justify-between'>
              <TextArea
                className='w-[90%] rounded-lg'
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Xin mời bạn để lại những đánh giá về sản phẩm, từ đó shop có thể cải thiện về chất lượng sản phẩm tốt nhất cho quý khách!'
                maxLength={2000}
              />
              <div className=' w-[10%]'>
                <button
                  onClick={() => handleSubmit()}
                  className='pl-10 pr-10 pt-2 pb-2 bg-money ml-4 text-custom-sm text-while rounded-lg hover:bg-black transform transition-all'
                >
                  Gửi
                </button>
              </div>
            </div>
            <div className='w-[90%] mt-10'>
              {products &&
                products.length &&
                products.map((p: any) => (
                  <div className='mt-4'>
                    <div className='flex items-center w-full justify-between'>
                      <div className='flex items-center'>
                        <div className='pr-6'>
                          <Avatar size={40} icon={<UserOutlined />} />
                        </div>
                        <div>
                          <p className='text-custom-sm'>{p.user?.name ? p.user?.name : 'Người tham gia'}</p>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div>
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-4'>
                            <path d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
                          </svg>
                        </div>
                        <p className='ml-2'>{timeSince(p.created_at)}</p>
                      </div>
                    </div>
                    <div className='pl-16'>
                      <div className=' p-2 shadow-block rounded-lg'>{p.comment}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment
