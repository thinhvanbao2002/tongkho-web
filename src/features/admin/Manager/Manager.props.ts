export interface IDataAccount {
  phone?: string
  name?: string
  email?: string
  password?: string
  avatar?: string
}

export interface IAccount {
  id?: string | null
  name: string
  phone: string
  email: string
  password?: string
  avatar?: string
  status: string
}

export interface IColumnAntD {
  title: string | null
  dataIndex: string
  key: string
  width?: number
  render?: (value: number, row?: any, index?: any) => any
  alight?: string
}

export interface IPayLoadListUser {
  page?: number
  limit?: number
  q?: string
  status?: string
  from_date?: string
  to_date?: string
}
