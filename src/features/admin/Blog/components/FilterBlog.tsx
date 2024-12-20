/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Col, Row } from 'antd'
import RJSearch from 'common/components/search/RJSearch'
import RadiusSelection from 'common/components/select/RadiusSelection'
import RangerPicker from 'common/components/rangePicker/RangePicker'
import { CommonStatus } from 'common/constants/constants'

interface IFilter {
  onChangeValue?: any
}

function FilterBlog({ onChangeValue }: IFilter) {
  return (
    <>
      <Row gutter={24}>
        <Col md={8}>
          <RJSearch
            placeholder='Nhập tên bài viết'
            onInputSearch={(value: string) => {
              onChangeValue({ search: value })
            }}
          />
        </Col>
        <Col md={8}>
          <RadiusSelection
            placeholder={'Trạng thái hoạt động'}
            onChange={(value: number) => {
              let tmpValue
              value === undefined ? (tmpValue = null) : (tmpValue = value)
              onChangeValue({ status: tmpValue })
            }}
            options={[
              { value: CommonStatus.ACTIVE, text: 'Đang hoạt động' },
              { value: CommonStatus.INACTIVE, text: 'Ngừng hoạt động' }
            ]}
          />
        </Col>
        <Col md={8}>
          <RangerPicker
            onChange={(name: string, value: any) => onChangeValue({ date: value ? value : '' })}
            name='createDate'
          />
        </Col>
      </Row>
    </>
  )
}

export default FilterBlog
