import { Plus, CheckCircle } from "lucide-react";

const IdeaList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Ideas</h2>
        <button className="p-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 flex items-center">
          <Plus size={16} className="mr-1" />
          Add Idea
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filters:</span>

          <div className="flex items-center space-x-2">
            <button>
              <span className="flex items-center">
                <CheckCircle size={12} className="mr-1" />
                Actionable
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaList;
