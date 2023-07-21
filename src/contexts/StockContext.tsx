import { createContext, useState } from 'react'
import { Item } from '../types/item'

export const StockContext = createContext({})

export function StockContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState<Item[]>(() => {
    const storedItems = localStorage.getItem('react-stock')

    if (!storedItems) return []

    const items = JSON.parse(storedItems) as Item[]
    items.forEach(item => {
      item.createdAt = new Date(item.createdAt)
      item.updatedAt = new Date(item.updatedAt)
    })

    return items
  })

  function addItem(item: Item) {
    setItems(currentState => {
      const updatedItems = [item, ...currentState]
      localStorage.setItem('react-stock', JSON.stringify(updatedItems))

      return updatedItems
    })
  }

  const stock = {
    items,
    addItem
  }

  return <StockContext.Provider value={stock}>{children}</StockContext.Provider>
}