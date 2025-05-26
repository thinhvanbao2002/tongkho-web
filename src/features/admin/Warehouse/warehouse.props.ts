export interface IWarehouse {
  id?: number
  warehouse_name: string
  warehouse_code: string
  status: string
}

export interface IPayLoadLisWarehouse {
  page?: number
  take?: number
  q?: string
  status?: number
  from_date?: string
  to_date?: string
}
