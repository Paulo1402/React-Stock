import { createContext, useState, useEffect } from 'react'
import { IStockItem, IStockContext, IStockItemForm } from '../types/common'

export const StockContext = createContext<IStockContext>({
  items: [],
  addItem: function (): void {
    throw new Error('Function not implemented.')
  },
  getItem: function (): IStockItem {
    throw new Error('Function not implemented.')
  },
  deleteItem: function (): void {
    throw new Error('Function not implemented.')
  },
  updatedItem: function (): void {
    throw new Error('Function not implemented.')
  }
})

export function StockContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState<IStockItem[]>(() => {
    const storedItems = localStorage.getItem('react-stock')

    if (!storedItems) return []

    const items = JSON.parse(storedItems) as IStockItem[]
    items.forEach(item => {
      item.createdAt = new Date(item.createdAt)
      item.updatedAt = new Date(item.updatedAt)
    })

    return items
  })

  function addItem(item: IStockItem) {
    setItems(currentState => {
      const updatedItems = [item, ...currentState]
      return updatedItems
    })
  }

  function getItem(itemId: number): IStockItem {
    const item = items.find(item => item.id === +itemId)

    if (!item) {
      throw new Error(`Item ${itemId} not found`)
    }

    return item
  }

  function updatedItem(itemId: number, newAttributes: IStockItemForm) {
    setItems(currentState => {
      const itemIndex = currentState.findIndex(item => item.id === +itemId)
      const updatedItems = [...currentState]

      Object.assign(updatedItems[itemIndex], newAttributes, {
        updatedAt: new Date()
      })

      return updatedItems
    })
  }

  function deleteItem(itemId: number) {
    setItems(currentState => {
      const updatedItems = currentState.filter(item => item.id !== itemId)
      return updatedItems
    })
  }

  function saveIntoLocalStorage() {
    localStorage.setItem('react-stock', JSON.stringify(items))
  }

  useEffect(saveIntoLocalStorage, [items])

  const stock = {
    items,
    addItem,
    getItem,
    updatedItem,
    deleteItem
  }

  return <StockContext.Provider value={stock}>{children}</StockContext.Provider>
}
