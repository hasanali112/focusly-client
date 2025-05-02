import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Clock,
  ClipboardList,
  BarChart2,
  DollarSign,
  Users,
} from "lucide-react";
import { useGetAllTasksQuery } from "@/redux/features/task/taskApi";
import { FC } from "react";
import {
  ICostData,
  IProgressItem,
  IStatusData,
  ITask,
  ITeamMember,
  ITimeMetrics,
} from "@/types";
import ReportCard from "@/components/report/ReportCard";

// Component to render dashboard cards
// Helper functions to calculate task metrics
const calculateTaskMetrics = (tasks: ITask[]) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "inProgress"
  ).length;

  // Calculate on-time tasks
  const onTimeTasks = tasks.filter((task) => {
    if (task.status !== "completed" || !task.workStartTime || !task.workEndTime)
      return false;

    const plannedEndTime = new Date(
      `${task.date.split("T")[0]}T${task.endTime}`
    );
    const actualEndTime = new Date(task.workEndTime);

    return actualEndTime <= plannedEndTime;
  }).length;

  // Determine late tasks
  const lateTasks = completedTasks - onTimeTasks;

  // Calculate overdue tasks
  const overdueTasks = tasks.filter((task) => {
    if (task.status === "completed") return false;

    const endDateTime = new Date(`${task.date.split("T")[0]}T${task.endTime}`);
    const now = new Date();

    return endDateTime < now;
  }).length;

  const onTimeCompletionRate =
    completedTasks > 0 ? Math.round((onTimeTasks / completedTasks) * 100) : 0;
  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const underBudget = 86; // Placeholder value

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    onTimeTasks,
    lateTasks,
    overdueTasks,
    onTimeCompletionRate,
    overallProgress,
    underBudget,
  };
};

// Calculate time for tasks in minutes
const calculateTaskTime = (task: ITask): number => {
  const startTimeParts = task.startTime.split(":").map(Number);
  const endTimeParts = task.endTime.split(":").map(Number);

  return (
    endTimeParts[0] * 60 +
    endTimeParts[1] -
    (startTimeParts[0] * 60 + startTimeParts[1])
  );
};

// Calculate actual time for completed tasks
const calculateActualTime = (task: ITask): number => {
  if (!task.workStartTime || !task.workEndTime) return 0;

  const actualStart = new Date(task.workStartTime);
  const actualEnd = new Date(task.workEndTime);
  return Math.floor(
    (actualEnd.getTime() - actualStart.getTime()) / (1000 * 60)
  );
};

const Report: FC = () => {
  const { data: apiResponse, isLoading, isError } = useGetAllTasksQuery([]);

  if (isLoading) {
    return (
      <div className="w-full p-4 flex justify-center items-center">
        Loading dashboard data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-4 flex justify-center items-center text-red-500">
        Error loading dashboard data. Please try again.
      </div>
    );
  }

  // Process tasks from API response
  const tasks: ITask[] = apiResponse?.data || [];

  // Calculate all metrics
  const {
    completedTasks,
    inProgressTasks,
    lateTasks,
    overdueTasks,
    overallProgress,
    underBudget,
  } = calculateTaskMetrics(tasks);

  // Create team workload data
  const taskFirstLetters = [...new Set(tasks.map((task) => task.taskName[0]))];

  const teamWorkload: ITeamMember[] = taskFirstLetters.map((letter) => {
    const tasksForMember = tasks.filter((task) => task.taskName[0] === letter);
    const completedTasks = tasksForMember.filter(
      (task) => task.status === "completed"
    ).length;
    const remainingTasks = tasksForMember.filter(
      (task) => task.status === "inProgress"
    ).length;

    // Calculate overdue tasks for this member
    const overdueTasks = tasksForMember.filter((task) => {
      if (task.status === "completed") return false;
      const endDateTime = new Date(
        `${task.date.split("T")[0]}T${task.endTime}`
      );
      const now = new Date();
      return endDateTime < now;
    }).length;

    return {
      name: `Team ${letter}`,
      completed: completedTasks,
      remaining: remainingTasks,
      overdue: overdueTasks,
    };
  });

  // Pie chart data for task status
  const taskStatusData: IStatusData[] = [
    { name: "Completed", value: completedTasks, color: "#2193b0" },
    { name: "In Progress", value: inProgressTasks, color: "#1c3c71" },
    { name: "Not Started", value: 0, color: "#f1f1f1" }, // No "notStarted" tasks in the data
  ];

  // Calculate task categories
  const taskCategories: Record<string, { total: number; completed: number }> =
    {};
  tasks.forEach((task) => {
    // Extract categories based on the first word in the task name
    const category = task.taskName.split(" ")[0];
    if (!taskCategories[category]) {
      taskCategories[category] = { total: 0, completed: 0 };
    }
    taskCategories[category].total += 1;
    if (task.status === "completed") {
      taskCategories[category].completed += 1;
    }
  });

  // Convert to progress data for visualization
  const progressData: IProgressItem[] = Object.keys(taskCategories).map(
    (category) => {
      const item = taskCategories[category];
      const completionPercent = Math.round((item.completed / item.total) * 100);
      const projectedPercent = Math.min(100, completionPercent + 15); // Project 15% more as planned

      return {
        name: category,
        actual: completionPercent,
        plan: projectedPercent,
      };
    }
  );

  // Calculate time metrics
  const plannedMinutes = tasks.reduce(
    (sum, task) => sum + calculateTaskTime(task),
    0
  );
  const actualMinutes = tasks.reduce(
    (sum, task) => sum + calculateActualTime(task),
    0
  );
  const slippageMinutes = actualMinutes - plannedMinutes;

  // Normalize values for visualization
  const maxTime = Math.max(plannedMinutes, actualMinutes);
  const timeData: ITimeMetrics = {
    planned: plannedMinutes,
    actual: actualMinutes,
    slippage: slippageMinutes,
    plannedPercent: Math.round((plannedMinutes / maxTime) * 100),
    actualPercent: Math.round((actualMinutes / maxTime) * 100),
    slippagePercent: Math.abs(Math.round((slippageMinutes / maxTime) * 100)),
  };

  // Generate cost data based on task time metrics
  const rate = 100; // Fictional rate of $100 per minute
  const actualCost = actualMinutes * rate;
  const plannedCost = plannedMinutes * rate;
  const budgetCost = plannedMinutes * rate * 2; // Budget is double the planned cost

  const costData: ICostData[] = [
    { name: "Actual", value: actualCost },
    { name: "Plan", value: plannedCost },
    { name: "Budget", value: budgetCost },
  ];

  const COLORS = ["#2193b0", "#1c3c71", "#f1f1f1"];

  return (
    <div className="w-full p-4 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-2">
          Project Status and Tasks Report Dashboard
        </h1>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        This dashboard shows the details related to project tasks, progress,
        time, costs, workloads, etc.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Project Detail Card */}
        <ReportCard
          title="Project Detail"
          icon={<Clock className="text-blue-500" size={20} />}
          bgColor="bg-blue-500"
        >
          <div className="divide-y">
            <div className="grid grid-cols-2 p-3">
              <div className="font-medium">Time</div>
              <div className="text-gray-700">
                {lateTasks > 0 ? `${lateTasks} Tasks Late` : "On Schedule"}
              </div>
            </div>
            <div className="grid grid-cols-2 p-3">
              <div className="font-medium">Tasks</div>
              <div className="text-gray-700">
                {inProgressTasks} Tasks to be Completed
              </div>
            </div>
            <div className="grid grid-cols-2 p-3">
              <div className="font-medium">Workload</div>
              <div className="text-gray-700">{overdueTasks} Tasks Overdue</div>
            </div>
            <div className="grid grid-cols-2 p-3">
              <div className="font-medium">Progress</div>
              <div className="text-gray-700">{overallProgress}% Complete</div>
            </div>
            <div className="grid grid-cols-2 p-3">
              <div className="font-medium">Cost</div>
              <div className="text-gray-700">{underBudget}% Under Budget</div>
            </div>
          </div>
        </ReportCard>

        {/* Tasks Card */}
        <ReportCard
          title="Tasks"
          icon={<ClipboardList className="text-blue-900" size={20} />}
          bgColor="bg-blue-900"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {taskStatusData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </ReportCard>

        {/* Progress Card */}
        <ReportCard
          title="Progress"
          icon={<BarChart2 className="text-blue-500" size={20} />}
          bgColor="bg-blue-500"
        >
          {progressData.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span>{item.actual}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${item.actual}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span></span>
                <span>{item.plan}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-900 h-2.5 rounded-full"
                  style={{ width: `${item.plan}%` }}
                ></div>
              </div>
            </div>
          ))}
        </ReportCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Time Card */}
        <ReportCard
          title="Time"
          icon={<Clock className="text-blue-900" size={20} />}
          bgColor="bg-blue-900"
        >
          <div className="h-full flex flex-col justify-center">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Planned Completion</span>
                <span>{timeData.planned} min</span>
              </div>
              <div className="w-full bg-gray-200 h-6 relative">
                <div
                  className="absolute right-0 h-6 bg-blue-900"
                  style={{ width: `${timeData.plannedPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Actual Completion</span>
                <span>{timeData.actual} min</span>
              </div>
              <div className="w-full bg-gray-200 h-6 relative">
                <div
                  className="absolute right-0 h-6 bg-blue-900"
                  style={{ width: `${timeData.actualPercent}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Slippage</span>
                <span>
                  {timeData.slippage > 0 ? "+" : ""}
                  {timeData.slippage} min
                </span>
              </div>
              <div className="w-full bg-gray-200 h-6 relative">
                {timeData.slippage !== 0 && (
                  <div
                    className={`absolute h-6 ${
                      timeData.slippage > 0 ? "bg-red-500" : "bg-blue-500"
                    }`}
                    style={{
                      width: `${timeData.slippagePercent}%`,
                      left:
                        timeData.slippage > 0
                          ? "50%"
                          : `${50 - timeData.slippagePercent}%`,
                    }}
                  ></div>
                )}
              </div>
            </div>

            <div className="flex justify-between text-sm mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-900 mr-1"></div>
                <span>Ahead</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-1"></div>
                <span>On Time</span>
              </div>
            </div>
          </div>
        </ReportCard>

        {/* Cost Card */}
        <ReportCard
          title="Cost"
          icon={<DollarSign className="text-blue-500" size={20} />}
          bgColor="bg-blue-500"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={costData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Amount" fill="#2193b0" />
            </BarChart>
          </ResponsiveContainer>
        </ReportCard>

        {/* Workload Card */}
        <ReportCard
          title="Workload"
          icon={<Users className="text-blue-900" size={20} />}
          bgColor="bg-blue-900"
          height="h-64 overflow-y-auto"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="w-20">Name</span>
            <span className="flex-1 text-center">Tasks</span>
          </div>
          {teamWorkload.map((member, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <span className="w-20 text-sm">{member.name}</span>
                <div className="flex-1 flex items-center">
                  <div
                    className="h-4 bg-blue-900"
                    style={{ width: `${member.completed * 10}%` }}
                  ></div>
                  <div
                    className="h-4 bg-blue-500"
                    style={{ width: `${member.remaining * 10}%` }}
                  ></div>
                  {member.overdue > 0 && (
                    <div
                      className="h-4 bg-red-500"
                      style={{ width: `${member.overdue * 10}%` }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between text-sm mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-900 mr-1"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 mr-1"></div>
              <span>Remaining</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-1"></div>
              <span>Overdue</span>
            </div>
          </div>
        </ReportCard>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4">
        This graph/chart is linked to excel, and changes automatically based on
        data. Just left click on it and select "Edit Data".
      </div>
    </div>
  );
};

export default Report;
