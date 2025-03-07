"use client"; // Ensure it's a client component

import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import ListComponent from "./List";
import { useState, useEffect } from "react";
import AddList from "./AddList";

const Board = () => {
    const [lists, setLists] = useState([]);
    const [isAddingList, setIsAddingList] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Prevents hydration issues

    useEffect(() => {
        setIsMounted(true); // Set mounted state to true
        const savedLists = localStorage.getItem("trelloBoard");
        if (savedLists) {
            setLists(JSON.parse(savedLists));
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("trelloBoard", JSON.stringify(lists));
        }
    }, [lists, isMounted]);

    const addList = (title) => {
        setLists([...lists, { id: crypto.randomUUID(), title, cards: [] }]);
        setIsAddingList(false);
    };

    const updateList = (id, title) => {
        setLists(lists.map((list) => (list.id === id ? { ...list, title } : list)));
    };

    const deleteList = (id) => {
        setLists(lists.filter((list) => list.id !== id));
    };

    const addCard = (id, title) => {
        setLists(
            lists.map((list) =>
                list.id === id ? { ...list, cards: [...list.cards, { id: crypto.randomUUID(), title }] } : list
            )
        );
    };

    const moveCard = (fromListId, toListId, cardId) => {
        setLists(
            lists.map((list) => {
                if (list.id === fromListId) {
                    return { ...list, cards: list.cards.filter((card) => card.id !== cardId) };
                }
                if (list.id === toListId) {
                    const cardToMove = lists.find((l) => l.id === fromListId).cards.find((c) => c.id === cardId);
                    return { ...list, cards: [...list.cards, cardToMove] };
                }
                return list;
            })
        );
    };

    const resetBoard = () => {
        setLists([]);
        localStorage.removeItem("trelloBoard");
    };

    if (!isMounted) return null; // Prevents SSR-related errors

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold">T</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Trello Board</h1>
                </div>
                <Button variant="destructive" className="flex items-center gap-2" onClick={resetBoard}>
                    <Trash2 size={16} />
                    Reset Board
                </Button>
            </header>

            <main className="flex-1 overflow-x-auto p-6">
                <div className="flex gap-4 min-h-[calc(100vh-8rem)]">
                    {lists?.map((list) => (
                        <ListComponent
                            key={list.id}
                            list={list}
                            onUpdateList={updateList}
                            onDeleteList={deleteList}
                            onAddCard={addCard}
                            onMoveCard={moveCard}
                        />
                    ))}
                    {isAddingList ? (
                        <AddList onAddList={addList} onCancel={() => setIsAddingList(false)} />
                    ) : (
                        <Button
                            variant="outline"
                            className="h-12 min-w-[272px] flex items-center justify-center gap-2 bg-white/80 hover:bg-white"
                            onClick={() => setIsAddingList(true)}
                        >
                            <Plus size={16} />
                            Add List
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Board;
    