import Breadcrumb from "../../../components/Breadcrumb";
import ChangePasswordForm from "../components/ChangePasswordForm";

const UserPasswordChangePage = () => {
  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Password"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
      <ChangePasswordForm />
    </div>
  );
};

export default UserPasswordChangePage;
