import { Col } from 'antd'
import RJSearch from 'common/components/search/RJSearch'
import RadiusSelection from 'common/components/select/RadiusSelection'
import RangerPicker from 'common/components/rangePicker/RangePicker'
import { useEffect, useState } from 'react'
import { warehouseServices } from '../../Warehouse/WarehouseApis'

interface IFilter {
  onChangeValue?: any
}

function FilterWarehouseHistory({ onChangeValue }: IFilter) {
  const [payload, setPayload] = useState<any>({
    q: '',
    limit: 5
  })
  const [warehouseListOptions, setWarehouseListOptions] = useState<any>([])

  const onSearch = (value: string) => {
    setPayload((prev) => ({
      ...prev,
      search: value,
      page: 1
    }));
  };

  const handleGetWarehouseListOptions = async (payload: any) => {
    try {
      const res = await warehouseServices.get(payload)
      setWarehouseListOptions(
        res.data.map((item: any) => {
          return {
            text: item?.name,
            value: item?.id
          }
        })
      )
    } catch (error) {
      console.log('🚀 ~ handleGetWarehouseListOptions ~ error:', error)
    }
  }

  useEffect(() => {
    handleGetWarehouseListOptions(payload)
  }, [payload])

  return (
    <>
      <Col md={7}>
        <RJSearch
          placeholder='Nhập tên sản phẩm'
          onInputSearch={(value: string) => {
            onChangeValue({ search: value })
          }}
        />
      </Col>
      <Col md={7}>
        <RadiusSelection
          showSearch={true}
          onSearch={(e) => onSearch(e)}
          placeholder={'Kho'}
          onChange={(value: number) => {
            let tmpValue
            value === undefined ? (tmpValue = null) : (tmpValue = value)
            onChangeValue({ warehouse_id: tmpValue })
          }}
          options={warehouseListOptions}
        />
      </Col>
      <Col md={10}>
        <RangerPicker
          onChange={(name: string, value: any) => onChangeValue({ date: value ? value : '' })}
          name='createDate'
        />
      </Col>
    </>
  )
}

export default FilterWarehouseHistory
