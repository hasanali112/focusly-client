import { Plus, Filter } from "lucide-react";

const ExpenseList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Expenses</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center">
            <Filter size={16} className="mr-1" />
            Filters
          </button>
          <button className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center">
            <Plus size={16} className="mr-1" />
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
