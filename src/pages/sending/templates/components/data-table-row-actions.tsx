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
import { useNavigate } from 'react-router-dom'
import DeleteDialog from '../../sender-ids/components/delete'
import { useState } from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = schema.parse(row.original);
  const [deleteTemplate, setDeleteTemplate] = useState(false);
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
        <DropdownMenuItem 
           onClick={() => {
            navigate(`/templates/${item.id}`,  {state:{record: item}})
          }}
        >View</DropdownMenuItem>
        <DropdownMenuItem 
         onClick={() => {
          navigate(`/templates/add/`,  {state:{record: item}})
        }}
        >Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>{
          setDeleteTemplate(true)
        }}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {deleteTemplate && <DeleteDialog id={item.id} name={item.name} onClose={() =>  setDeleteTemplate(false)}/>}
    </DropdownMenu>
  )
}
