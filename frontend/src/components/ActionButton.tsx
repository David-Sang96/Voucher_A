import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  icon: ReactNode;
  to: string;
};

const ActionButton = ({ name, icon, to }: Props) => {
  return (
    <Link
      to={to}
      className="mb-0.5 me-2 flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {name} {icon}
    </Link>
  );
};

export default ActionButton;
