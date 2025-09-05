/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useState } from "react";
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
import {
  useCreateTasksMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task/taskApi";
import { toast } from "sonner";
import { ITask } from "@/types";

interface TaskFormProps {
  isEdit?: boolean;
  initialData?: ITask;
}

interface ITaskFormInputs {
  title: string;
  startTime?: string;
  endTime?: string;
  date?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "inProgress" | "completed";
}

const TaskForm = ({ isEdit = false, initialData }: TaskFormProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ITaskFormInputs>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          date: initialData.date
            ? new Date(initialData.date).toISOString().split("T")[0]
            : "",
          startTime: initialData.startTime
            ? new Date(initialData.startTime).toTimeString().slice(0, 5)
            : "",
          endTime: initialData.endTime
            ? new Date(initialData.endTime).toTimeString().slice(0, 5)
            : "",
          priority: initialData.priority as "low" | "medium" | "high",
          status: initialData.status as "pending" | "inProgress" | "completed",
        }
      : {
          priority: "medium",
          status: "pending",
        },
  });

  const [createTasks, { isLoading: isCreating }] = useCreateTasksMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const onSubmit: SubmitHandler<ITaskFormInputs> = async (data) => {
    try {
      const processedData = { ...data };
      
      // Keep startTime and endTime as simple time strings (HH:MM format)
      // The backend will handle the conversion with the date
      
      if (isEdit && initialData) {
        const res = await updateTask({
          id: initialData._id,
          payload: processedData,
        }).unwrap();
        if (res?.success) {
          toast.success(res.message);
        }
      } else {
        const res = await createTasks(processedData).unwrap();
        if (res?.success) {
          toast.success(res.message);
          reset();
          setOpen(false);
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(
        error?.data?.message ||
          (isEdit ? "Error updating task" : "Error creating task")
      );
    }
  };

  const isLoading = isCreating || isUpdating;

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-6 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="font-medium">
            Task Name
          </Label>
          <Input
            id="title"
            placeholder="Enter task name"
            className="w-full"
            {...register("title", { required: "Task name is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
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
          <Controller
            name="priority"
            control={control}
            defaultValue="medium"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status" className="font-medium">
            Status
          </Label>
          <Controller
            name="status"
            control={control}
            defaultValue="pending"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="font-medium"
          onClick={() => {
            reset();
            if (!isEdit) setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 font-medium w-[150px]"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin text-white" />
          ) : isEdit ? (
            "Update Task"
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  );

  if (isEdit) {
    return formContent;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        {formContent}
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
