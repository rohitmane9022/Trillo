
'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MoreHorizontal, Plus, X } from "lucide-react"
import CardComponent from "./CardComponent"

const ListComponent = ({ list, onUpdateList, onDeleteList, onAddCard, onMoveCard }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(list.title)
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState("")

    const handleTitleSubmit = (e) => {
        e.preventDefault()
        if (title.trim()) {
            onUpdateList(list.id, title)
            setIsEditing(false)
        }
    }

    const handleAddCard = (e) => {
        if (newCardTitle.trim()) {
            onAddCard(list.id, newCardTitle)
            setNewCardTitle("")
            setIsAddingCard(false)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.currentTarget.classList.add('bg-gray-200')
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('bg-gray-200')
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('bg-gray-200')
        const cardId = e.dataTransfer.getData('cardId')
        const fromListId = e.dataTransfer.getData('fromListId')
        
        if (fromListId !== list.id) {
            onMoveCard(fromListId, list.id, cardId)
        }
    }

    return (
        <div 
            className="bg-gray-100 rounded-lg shadow-sm min-w-[272px] max-w-[272px] flex flex-col max-h-[calc(100vh-10rem)] h-fit"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="p-2 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                    {isEditing ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleTitleSubmit()
                            }}
                            className="flex-1"
                        >
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={handleTitleSubmit}
                                autoFocus
                                className="h-7 text-sm font-medium"
                            />
                        </form>
                    ) : (
                        <h3
                            className="font-medium text-gray-800 flex-1 cursor-pointer py-1 px-1 rounded hover:bg-gray-200"
                            onClick={() => {
                                setIsEditing(true)
                            }}
                        >
                            {list.title}
                        </h3>
                    )}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsEditing(true)}>Edit List</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => onDeleteList(list.id)}>
                            Delete List
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {list.cards.map((card) => (
                    <CardComponent
                        key={card.id}
                        card={card}
                        listId={list.id}
                    />
                ))}
            </div>

            <div className="p-2">
                {isAddingCard ? (
                    <div className="space-y-2">
                        <div className="bg-white rounded shadow-sm p-2">
                            <textarea
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                value={newCardTitle}
                                placeholder="Enter a title for this card..."
                                className="w-full resize-none border-none focus:outline-none text-sm"
                                rows={3}
                                autoFocus
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" onClick={handleAddCard}>
                                Add Card
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                    setIsAddingCard(false)
                                    setNewCardTitle("")
                                }}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:bg-gray-200"
                        onClick={() => setIsAddingCard(true)}
                    >
                        <Plus size={16} className="mr-1" />
                        Add a card
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ListComponent