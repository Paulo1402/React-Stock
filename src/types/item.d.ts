export interface IItem {
  id: number
  name: string
  description: string
  quantity: number
  price: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface IStockContext {
  items?: IItem[]
  addItem?: (item: IItem) => void
}
