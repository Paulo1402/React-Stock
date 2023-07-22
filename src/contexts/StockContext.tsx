import { createContext, useState, useEffect } from 'react'
import { IStockItem, IStockContext } from '../types/item'

export const StockContext = createContext<IStockContext>({
  items: [],
  addItem: function (): void {
    throw new Error('Function not implemented.')
  },
  deleteItem: function (): void {
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

  function deleteItem(itemId: number) {
    setItems(currentState => {
      const updatedItems = currentState.filter(item => item.id !== itemId)
      return updatedItems
    })
  }

  useEffect(() => {
    localStorage.setItem('react-stock', JSON.stringify(items))
  }, [items])

  const stock = {
    items,
    addItem,
    deleteItem
  }

  return <StockContext.Provider value={stock}>{children}</StockContext.Provider>
}
