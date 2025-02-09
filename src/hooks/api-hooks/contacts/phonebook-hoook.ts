import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { contactService } from '@/api/services/contacts/contacts.service'
import { useNavigate } from 'react-router-dom'

export const usePhonebook = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // Add to phonebook mutation
  const uploadPhoneBook = useMutation({
    mutationFn: ({ data }: { data: any }) =>
      contactService.uploadPhoneBook(data.fileData, data.params),
    onSuccess: () => {
      navigate('/contacts')
      queryClient.invalidateQueries({ queryKey: ['phone-books'] })
      toast.success('Added to phonebook successfully')
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Failed to add to phonebook'
      toast.error(errorMessage)
    },
  })

  const addContactToPhonebook = useMutation({
    mutationFn: ({ data }: { data: any }) =>
      contactService.addPhoneBookNumber(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phone-books', 'phonebook'] })
      toast.success('Added to phonebook successfully')
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Failed to add to phonebook'
      toast.error(errorMessage)
    },
  })

  // Update phonebook entry mutation
  // const updatePhonebookEntry = useMutation({
  //     mutationFn: ({ id, data }: { id: number; data: any }) =>
  //         phonebookService.updatePhonebookEntry(id, data),
  //     onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['phonebook'] });
  //         toast.success('Phonebook entry updated successfully');
  //     },
  //     onError: (error: any) => {
  //         const errorMessage =
  //             error?.response?.data?.message || 'Failed to update phonebook entry';
  //         toast.error(errorMessage);
  //     }
  // });

  // // Remove from phonebook mutation
  // const removeFromPhonebook = useMutation({
  //     mutationFn: (id: number) => phonebookService.deletePhonebookEntry(id),
  //     onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['phonebook'] });
  //         toast.success('Removed from phonebook successfully');
  //     },
  //     onError: (error: any) => {
  //         const errorMessage =
  //             error?.response?.data?.message || 'Failed to remove from phonebook';
  //         toast.error(errorMessage);
  //     }
  // });

  return {
    uploadPhoneBook,
    addContactToPhonebook,
  }
}
