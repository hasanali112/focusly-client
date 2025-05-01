import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import ExpensesPage from "@/pages/ExpensesPage";
import IdeasPage from "@/pages/IdeasPage";
import PlannerPage from "@/pages/PlannerPage";
import PomodoroPage from "@/pages/PomodoroPage";
import ProjectsPage from "@/pages/ProjectsPage";
import SettingsPage from "@/pages/SettingsPage";
import TasksPage from "@/pages/TasksPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "pomodoro", element: <PomodoroPage /> },
      { path: "planner", element: <PlannerPage /> },
      { path: "expenses", element: <ExpensesPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "ideas", element: <IdeasPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
