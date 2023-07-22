import useStock from '../hooks/useStock'

interface DeleteButtonProps {
  itemId: number
  itemName: string
}

export default function DeleteButton({ itemId, itemName }: DeleteButtonProps) {
  const { deleteItem } = useStock()

  function handleDelete() {
    if (confirm(`Tem certeza que deseja excluir o item ${itemName}?`)) {
      deleteItem(itemId)
      alert('Item excluído!')
    }
  }

  return (
    <button className="button is-danger is-small" onClick={handleDelete}>
      Excluir
    </button>
  )
}
