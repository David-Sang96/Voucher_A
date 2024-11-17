import Breadcrumb from "../../../components/Breadcrumb";
import ChangeNameForm from "../components/ChangeNameForm";

const UserNameChangePage = () => {
  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Name"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
      <div className="mx-auto max-w-lg p-5 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Update Your Name</h2>
        <ChangeNameForm />
      </div>
    </div>
  );
};

export default UserNameChangePage;
