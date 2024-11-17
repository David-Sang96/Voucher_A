import Breadcrumb from "../../../components/Breadcrumb";
import UserInfo from "../components/UserInfo";

const UserProfileHomePage = () => {
  return (
    <section>
      <Breadcrumb currentPageTitle="Profile" />
      <UserInfo />
    </section>
  );
};

export default UserProfileHomePage;
