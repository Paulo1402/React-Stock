export interface IStockItemToCreate {
  name: string
  description: string
  quantity: number
  price: number
  category: string
}

export interface IStockItem extends IStockItemToCreate {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface IStockContext {
  items: IStockItem[]
  addItem: (item: IStockItem) => void
}
