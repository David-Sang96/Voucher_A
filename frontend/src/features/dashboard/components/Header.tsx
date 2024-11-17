// import { getCookie } from "react-use-cookie";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";

const Header = () => {
  // always fetches the latest value stored in the cookie
  // const user = getCookie("auth_user");
  // const { name, email, profile_image } = JSON.parse(user);
  const { name, email, profile_image } =
    useUserStore((state) => state.user) || {};

  return (
    <header>
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"} className="text-xl font-bold md:text-3xl">
            Voucher App
          </Link>
          <p className="font-semibold text-stone-500 max-sm:text-sm">
            Top Reacher
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={
              profile_image ??
              "https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg"
            }
            alt=" profile image"
            className="size-11 rounded-full border-2 border-blue-500 object-cover object-top"
          />
          <div>
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm font-semibold text-stone-500">{email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
