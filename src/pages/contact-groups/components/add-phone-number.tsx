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
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
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
                    <div className="grid gap-2">
                        <Label htmlFor="col1">Enter Column A</Label>
                        <Input
                          id="col1"
                          placeholder="Enter Column A"
                          {...register("col1", { required: false })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="col2">Enter Column B</Label>
                        <Input
                          id="col2"
                          placeholder="Enter Column B"
                          {...register("col2", { required: false })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="col2">Enter Column C</Label>
                        <Input
                          id="col3"
                          placeholder="Enter Column C"
                          {...register("col3", { required: false })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="col2">Enter Column D</Label>
                        <Input
                          id="col4"
                          placeholder="Enter Column D"
                          {...register("col4", { required: false })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="col2">Enter Column E</Label>
                        <Input
                          id="col5"
                          placeholder="Enter Column E"
                          {...register("col5", { required: false })}
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