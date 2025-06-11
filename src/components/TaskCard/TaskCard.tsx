import { useState } from "react";

const TaskCard = () => {
  const [tasks, setTasks] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    return { date: `${day}-${month}-${year}`, dayName };
  };

  const { date, dayName } = getCurrentDate();

  return (
    <div>
      <div className=" rounded-md border border-gray-300 p-6 w-full bg-white mt-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-500">
              <span className="font-semibold text-lg">D1</span>
            </div>
            <div className="">
              <span className="text-xl font-medium">
                Date: {date}, Day: {dayName}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Sl No
                </th>
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Work List
                </th>
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Category
                </th>
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Time
                </th>
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Duration
                </th>
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Status
                </th>
                <th className="text-left text-gray-500 font-medium py-3 px-2">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-8">
                    No tasks added yet. Click "Add Task" to get started.
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="text-gray-500 py-3 px-2"></td>
                    <td className="text-gray-500 py-3 px-2"></td>
                    <td className="text-gray-500 py-3 px-2"></td>
                    <td className="text-gray-500 py-3 px-2"></td>
                    <td className="text-gray-500 py-3 px-2"></td>
                    <td className="py-3 px-2"></td>
                    <td className="py-3 px-2">
                      <button className="text-red-400 hover:text-red-300 font-medium transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
