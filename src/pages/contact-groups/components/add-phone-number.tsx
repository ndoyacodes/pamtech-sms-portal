import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { usePhonebook } from "@/hooks/api-hooks/contacts/phonebook-hoook";

interface AddPhoneNumberFormData {
    recipient: string;
}

export function AddPhoneNumberModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const {addContactToPhonebook} =  usePhonebook();
    
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<AddPhoneNumberFormData>();

    const onSubmit = async (data: AddPhoneNumberFormData) => {
        try {
            const payload = {
                recipient: data.recipient,
                phoneBook: parseInt(id as string),
            };
           await addContactToPhonebook.mutate({data: payload});
           setIsOpen(false);
           reset();

        } catch (error) {
          
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Add Phone Number</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Phone Number</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="recipient">Phone Number</Label>
                        <Input
                            id="recipient"
                            placeholder="Enter phone number"
                            {...register("recipient", { required: true })}
                        />
                    </div>
                  

                    <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={addContactToPhonebook.isPending}>
                        {addContactToPhonebook.isPending ? "Adding..." : "Add Phone Number"}
                    </Button>
                </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}