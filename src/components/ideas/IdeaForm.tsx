import { X } from "lucide-react";

interface IdeaFormProps {
  ideaId: string | null;
  onClose: () => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ ideaId, onClose }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {ideaId ? "Edit Idea" : "Add New Idea"}
        </h2>
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default IdeaForm;
