import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { schema } from '../data/schema'
import { useState } from 'react'
import DeleteBlacklistDialog from './delete'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = schema.parse(row.original);
  const [deleteBlacklistEntry, setDeleteBlacklistEntry] = useState(false)

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
        {/* <DropdownMenuItem onClick={()=>{console.log(item)}}>Edit</DropdownMenuItem> */}
        <DropdownMenuItem onClick={()=>{setDeleteBlacklistEntry(true)}}>
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>

      {deleteBlacklistEntry && ( <DeleteBlacklistDialog id={item.id} name={item.msisdn} onClose={() => setDeleteBlacklistEntry(false)}/>)}
    </DropdownMenu>
  )
}
