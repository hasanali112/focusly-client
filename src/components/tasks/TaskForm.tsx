import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { Loader, Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTasksMutation } from "@/redux/features/task/taskApi";
import { toast } from "sonner";

const TaskForm = () => {
  const { register, setValue, handleSubmit } = useForm();
  const [createTasks, { isLoading }] = useCreateTasksMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createTasks(data).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus size={16} />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border border-gray-300 rounded shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Task</DialogTitle>
          <DialogDescription className="text-gray-500">
            Create a new task to track your progress
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="taskName" className="font-medium">
                Task Name
              </Label>
              <Input
                id="taskName"
                placeholder="Enter task name"
                className="w-full"
                {...register("taskName", { required: true })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startTime" className="font-medium">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                className="w-full"
                {...register("startTime")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime" className="font-medium">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                className="w-full"
                {...register("endTime")}
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

            <div className="grid gap-2">
              <Label htmlFor="priority" className="font-medium">
                Priority
              </Label>
              <Select onValueChange={(value) => setValue("priority", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status" className="font-medium">
                Status
              </Label>
              <Select onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
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
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
