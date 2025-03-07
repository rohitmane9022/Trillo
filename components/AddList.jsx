"use client"
import { useState } from 'react'
import { Input } from './ui/input'
import { X } from 'lucide-react'
import { Button } from './ui/button'

const AddList = ({onAddList,onCancel}) => {
    const [title, setTitle] = useState("")
    

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(title.trim){
            onAddList(title)
      setTitle("")
        }
    }

  return (
    <div className='bg-white rounded-lg shadow-sm p-2 w-[272px]'>
        <form onSubmit={handleSubmit}>
        <Input

          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title..."
          className="mb-2"
        />
         <div className="flex items-center gap-2">
          <Button type="submit" size="sm">
            Add List
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
            <X size={16} />
          </Button>
        </div>
        </form>
    </div>
  )
}

export default AddList