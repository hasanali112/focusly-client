import { useState } from "react";
import { Plus, CheckCircle2, Circle, Trash2, Target } from "lucide-react";
import WorkCard from "@/components/TaskCard/TaskCard";
import TaskCard from "@/components/TaskCard/TaskCard";

const WeeklyTarget = () => {
  const [targets, setTargets] = useState([
    {
      id: 1,
      text: "Python Learning",
      completed: false,
      category: "Study",
    },
    {
      id: 2,
      text: "Complete project documentation",
      completed: false,
      category: "Work",
    },
  ]);

  const [newTarget, setNewTarget] = useState("");

  const addTarget = () => {
    if (newTarget.trim()) {
      setTargets([
        ...targets,
        {
          id: Date.now(),
          text: newTarget,
          completed: false,
          category: "General",
        },
      ]);
      setNewTarget("");
    }
  };

  const toggleTarget = (id) => {
    setTargets(
      targets.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTarget = (id) => {
    setTargets(targets.filter((t) => t.id !== id));
  };

  const completedTargets = targets.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen  p-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Weekly Schedule Tracker
          </h1>
          <p className="text-gray-600">
            Track your weekly goals and mark them complete
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Weekly Targets
                </h2>
              </div>
              <div className="text-sm text-gray-600">
                {completedTargets} of {targets.length} completed
              </div>
            </div>
          </div>

          {/* Target List */}
          <div className="divide-y divide-gray-200">
            {targets.map((target, index) => (
              <div
                key={target.id}
                className="p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* List Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>

                  {/* Completion Button */}
                  <button
                    onClick={() => toggleTarget(target.id)}
                    className="flex-shrink-0"
                  >
                    {target.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors" />
                    )}
                  </button>

                  {/* Target Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg font-medium ${
                        target.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {target.text}
                    </p>
                    {target.completed && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ Completed - Great job!
                      </p>
                    )}
                  </div>

                  {/* OK Button (Complete Action) */}
                  <button
                    onClick={() => toggleTarget(target.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      target.completed
                        ? "bg-green-100 text-green-700 cursor-default"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {target.completed ? "Complete" : "OK"}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTarget(target.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {targets.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No targets yet</p>
                <p>Add your first weekly target to get started!</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <TaskCard />
        </div>
      </div>
    </div>
  );
};

export default WeeklyTarget;
