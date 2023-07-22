import { useNavigate } from 'react-router-dom'
import useStock from '../hooks/useStock'

interface DeleteButtonProps {
  itemId: number
  itemName: string
}

export default function DeleteButton({ itemId, itemName }: DeleteButtonProps) {
  const { deleteItem } = useStock()
  const navigate = useNavigate()

  function handleDelete() {
    if (confirm(`Tem certeza que deseja excluir o item ${itemName}?`)) {
      deleteItem(itemId)
      alert('Item excluído!')
      navigate('/items')
    }
  }

  return (
    <button className="button is-danger is-small" onClick={handleDelete}>
      Excluir
    </button>
  )
}
