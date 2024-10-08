import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  icon: ReactNode;
  url: string;
};

const HomeCard = ({ name, icon, url }: Props) => {
  return (
    <Link
      to={url}
      className="flex h-[130px] flex-col items-center justify-center gap-2 rounded-md bg-blue-600 text-white transition-all duration-300 ease-in-out hover:bg-blue-500 md:h-[200px]"
    >
      <div className="text-3xl lg:text-5xl">{icon} </div>
      <div className="text-sm md:text-lg">{name}</div>
    </Link>
  );
};

export default HomeCard;
