export interface ICategory {
  id?: number
  name: string
  status: string
}

export interface IPayLoadLisCategory {
  page?: number
  limit?: number
  q?: string
  status?: number
  from_date?: string
  to_date?: string
}
