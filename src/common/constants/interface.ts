export interface IColumnAntD {
  title: string | null
  dataIndex: string
  key: string
  width?: number
  render?: (value: number, row?: any, index?: any) => any
  alight?: string
}
