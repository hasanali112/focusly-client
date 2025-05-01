export interface ITask {
  pomodoro: boolean;
  _id: string;
  taskName: string;
  startTime: string;
  endTime: string;
  date: string;
  priority: string;
  status: string;
  pomodoros: boolean;
  completedPomodoros: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  actionable: boolean;
  projectId?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  receipt?: string;
  notes?: string;
}

export interface PomodoroSession {
  id: string;
  taskId: string;
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: "daily" | "weekly" | "monthly";
}

export interface DailyPlan {
  id: string;
  date: string;
  taskIds: string[];
  notes: string;
}
