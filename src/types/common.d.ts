export interface IStockItemForm {
  name: string
  description: string
  quantity: number
  price: number
  category: string
}

export interface IStockItem extends IStockItemForm {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface IStockContext {
  items: IStockItem[]
  addItem: (item: IStockItem) => void
  getItem: (itemId: number) => IStockItem
  updatedItem: (itemId: number, newAttributes: IStockItemForm) => void
  deleteItem: (itemId: number) => void
}
