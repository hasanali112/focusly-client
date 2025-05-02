interface IProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  children: React.ReactNode;
  height?: string;
}

const ReportCard = ({
  title,
  icon,
  bgColor,
  children,
  height = "h-64",
}: IProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`${bgColor} text-white p-3 flex items-center`}>
        <div className="rounded-full bg-white p-2 mr-2">{icon}</div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className={`p-3 ${height}`}>{children}</div>
    </div>
  );
};

export default ReportCard;
