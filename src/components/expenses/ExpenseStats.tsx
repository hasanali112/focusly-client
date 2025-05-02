const ExpenseStats = ({ expenses, getCategoryColor }) => {
  // Calculate statistics
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce((totals, expense) => {
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += expense.amount;
    return totals;
  }, {});

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Expense Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold">${totalExpense.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold">${totalExpense.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Average Per Day</p>
          <p className="text-2xl font-bold">
            ${(totalExpense / 30).toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Transactions</p>
          <p className="text-2xl font-bold">{expenses.length}</p>
        </div>
      </div>

      <h3 className="text-md font-medium text-gray-700 mb-3">
        Spending by Category
      </h3>
      <div className="space-y-3">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <div key={category} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${getCategoryColor(
                category
              )} mr-2`}
            ></div>
            <div className="flex-grow">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {category}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${getCategoryColor(category)} h-2 rounded-full`}
                  style={{ width: `${(total / totalExpense) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseStats;
