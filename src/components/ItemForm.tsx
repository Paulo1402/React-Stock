import { ChangeEvent, FormEvent, useState, useRef } from 'react'
import { IStockItem, IStockItemForm } from '../types/common'
import StockItem, { CATEGORIES } from '../entities/StockItem'
import useStock from '../hooks/useStock'

interface ItemFormProps {
  itemToUpdate?: IStockItem
}

type HTMLFormElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

export default function ItemForm({ itemToUpdate }: ItemFormProps) {
  const defaultItem: IStockItemForm = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    category: ''
  }

  const [item, setItem] = useState<IStockItemForm>(
    itemToUpdate ? itemToUpdate : defaultItem
  )
  const { addItem, updatedItem } = useStock()
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleChange(ev: ChangeEvent<HTMLFormElements>) {
    setItem(currentState => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value
      }
    })
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    try {
      if (itemToUpdate) {
        updatedItem(itemToUpdate.id, item)
        alert('Item atualizado com sucesso!')
      } else {
        const stockItem = new StockItem(item)

        addItem(stockItem)
        setItem(defaultItem)
        inputRef.current?.focus()

        alert('Item cadastrado com sucesso!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            ref={inputRef}
            value={item.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={0}
            step={1}
            value={item.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.0}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecione uma categoria...
            </option>
            {CATEGORIES.map(category => (
              <option
                key={category}
                value={category}
                defaultChecked={item.category === category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button className="button is-primary is-large">Salvar</button>
    </form>
  )
}
