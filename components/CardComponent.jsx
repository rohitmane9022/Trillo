
"use client"

const CardComponent = ({ card, listId }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('cardId', card.id)
        e.dataTransfer.setData('fromListId', listId)
    }

    return (
        <div
            className="bg-white rounded shadow-sm p-2 cursor-grab hover:bg-gray-50"
            draggable="true"
            onDragStart={handleDragStart}
        >
            <div className="text-sm text-gray-800">{card.title}</div>
        </div>
    )
}

export default CardComponent