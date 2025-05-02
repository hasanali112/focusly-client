import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateExpensesMutation } from "@/redux/features/expense/expenseApi";
import { Loader, PlusCircle } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ExpenseForm = () => {
  const { register, handleSubmit } = useForm();
  const [createExpenses, { isLoading }] = useCreateExpensesMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createExpenses(data).unwrap();
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Error creating expense");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
            <PlusCircle size={16} className="mr-2" />
            Add Expense
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="expenseName" className="font-medium">
                  Expensr Name
                </Label>
                <Input
                  id="expenseName"
                  placeholder="Enter expense name"
                  className="w-full"
                  {...register("expenseName", { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="font-medium">
                  Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  className="w-full"
                  {...register("description")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount" className="font-medium">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="text"
                  className="w-full"
                  {...register("amount")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date" className="font-medium">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="w-full"
                  {...register("date")}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" className="font-medium">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 font-medium w-[150px]"
              >
                {isLoading ? (
                  <Loader className="animate-spin text-white" />
                ) : (
                  "Create Expense"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseForm;
