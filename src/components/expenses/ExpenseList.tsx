/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";

import ExpenseForm from "./ExpenseForm";
import { useGetExpensesQuery } from "@/redux/features/expense/expenseApi";
import { IExpense } from "@/types";

const ExpenseList = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const isoString = date.toISOString();

  const {
    data: expenseData,
    isLoading,
    isError,
  } = useGetExpensesQuery([{ key: "date", value: isoString }]);

  const expenses = expenseData?.data || [];

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - Updated to match Task Manager */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600">Track your expenses efficiently</p>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Add - Updated to match Task Manager */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ExpenseForm />
        </div>

        {/* Current Date - Like Task Manager */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
        </div>

        {/* Status Tabs - Like Task Manager */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="whitespace-nowrap py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
              All Expenses
            </button>
            <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Pending
            </button>
            <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              In Progress
            </button>
            <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Completed
            </button>
          </nav>
        </div>

        {/* Expenses Table - Updated to match Task Manager style */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading expenses...
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500">
              Failed to load expenses
            </div>
          ) : expenses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No expenses found for today
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[5%]"
                    >
                      Sl.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[70%]"
                    >
                      Expense Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense: IExpense, index: number) => (
                    <tr key={expense._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expense.expenseName}
                        <br />
                        <span className="text-[10px]">
                          {expense.description}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ৳ {expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 whitespace-nowrap text-right"
                    >
                      Total:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ৳{" "}
                      {expenses
                        .reduce(
                          (sum: any, expense: any) => sum + expense.amount,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExpenseList;
