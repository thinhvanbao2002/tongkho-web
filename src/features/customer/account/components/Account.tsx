import { Button, Form, Input } from 'antd'
import ModalComponent from 'common/components/modal/Modal'
import UploadSingleFile from 'common/components/upload/UploadComponent'

interface IAccount {
  openModal?: boolean
  isLoading?: boolean | false
  titleModal?: any
  onClose?: () => void
}

function AccountUser({ openModal, isLoading, titleModal, onClose }: IAccount) {
  return (
    <>
      <ModalComponent
        loading={isLoading}
        title={<p className='text-custom-xl font-light'>{titleModal}</p>}
        width={800}
        modalVisible={openModal ?? false}
        children={
          <div className='mt-4'>
            <div className='w-full h-auto flex items-center justify-center'>
              <div className='w-[30%]'>
                <UploadSingleFile />
              </div>
              <div className='w-[70%]'>
                <Form layout='vertical'>
                  <Form.Item
                    name='name'
                    label='Họ và tên'
                    rules={[{ required: true, message: 'Vui lòng nhập đủ họ và tên!' }]}
                  >
                    <Input className='outline-money' placeholder='Họ và tên' />
                  </Form.Item>
                  <Form.Item
                    label='Số điện thoại'
                    name='phone'
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại!' },
                      { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder='Số điện thoại' />
                  </Form.Item>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder='Email' />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    label='Mật khẩu'
                    rules={[{ required: true, message: 'Vui lòng nhập đủ họ và tên!' }]}
                  >
                    <Input type='password' placeholder='Nhập mật khẩu' />
                  </Form.Item>
                  <Form.Item
                    name='rePassword'
                    label='Mật khẩu xác nhận'
                    rules={[{ required: true, message: 'Vui lòng nhập đủ họ và tên!' }]}
                  >
                    <Input type='password' placeholder='Nhập lại mật khẩu' />
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className='flex justify-end mt-4'>
              <Button danger onClick={onClose}>
                Thoát
              </Button>
              <Button className='bg-money border-money ml-4'>Lưu</Button>
            </div>
          </div>
        }
      />
    </>
  )
}

export default AccountUser
