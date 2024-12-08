/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import AxiosClient from 'apis/axiosClient'
import { v4 as uuidv4 } from 'uuid'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const UploadMultipart: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [progress, setProgress] = React.useState(0)
  const [fileList, setFileList] = useState<any[]>([])
  console.log('🚀 ~ fileList:', fileList)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

  const handleUpload = async (options: any) => {
    const { file, onProgress, onSuccess, onError } = options
    const fmData = new FormData()
    const config = {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100)
        setProgress(percent)
        onProgress({ percent }) // Cập nhật tiến trình
      }
    }

    fmData.append('image', file)

    try {
      const res: any = await AxiosClient.post(`uploads/image`, fmData, config)
      console.log('🚀 ~ handleUpload ~ res:', res)

      // Đánh dấu upload thành công
      onSuccess({
        url: res?.data?.absoluteUrl // Cập nhật URL trả về từ server
      })
    } catch (error) {
      console.log('🚀 ~ handleUpload ~ error:', error)
      onError(error) // Đánh dấu upload lỗi
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  return (
    <>
      <Upload
        customRequest={handleUpload}
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default UploadMultipart
