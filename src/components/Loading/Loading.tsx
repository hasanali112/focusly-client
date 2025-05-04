import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="bg-white/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Loader className="size-[70px] animate-spin text-indigo-600" />
    </div>
  );
};

export default Loading;
