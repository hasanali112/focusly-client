import { Download, ArrowUpDown, PieChart, DollarSign } from "lucide-react";

import ExpenseForm from "./ExpenseForm";

const ExpenseList = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <DollarSign className="mr-2 text-green-500" size={24} />
            Expense Tracker
          </h1>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
              <PieChart size={16} className="mr-2" />
              Stats
            </button>
            <ExpenseForm />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
            <Download size={16} className="mr-1" />
            Export CSV
          </button>
        </div>

        {/* Expenses Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      Amount
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      Description
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200"></tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Expense Tracker Dashboard • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ExpenseList;
