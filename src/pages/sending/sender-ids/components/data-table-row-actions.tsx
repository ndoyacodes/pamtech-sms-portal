import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { schema } from '../data/schema'
import { useState } from 'react'
import DeleteDialog from './delete'
import { useNavigate } from 'react-router-dom'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = schema.parse(row.original);
  const [deleteSenderId, setDeleteSenderId] = useState(false);
  const name  = schema.parse(row.original).senderId;
  const navigate =  useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={()=>{console.log(item)}}>View</DropdownMenuItem>
        <DropdownMenuItem  onClick={() => {
          navigate(`/sender-ids/add/`,  {state:{record: item}})
        }}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>{
           setDeleteSenderId(true)
        }}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {deleteSenderId && (
        <DeleteDialog id={item.id} name={name} onClose={() => setDeleteSenderId(false)}/>
      )}
    </DropdownMenu>
  )
}
