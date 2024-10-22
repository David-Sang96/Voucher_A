import Breadcrumb from "../components/Breadcrumb";

const ChangePassword = () => {
  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Password"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
      ChangePassword
    </div>
  );
};

export default ChangePassword;
