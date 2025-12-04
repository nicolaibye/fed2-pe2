import AccountSettings from "../settings/AccountSettings";
import { useSearchParams } from "react-router-dom";
import NewVenue from "../settings/NewVenue";
import EditVenue from "../settings/EditVenue";

function EditOverlay() {
  const [searchParams] = useSearchParams();
  const settings = searchParams.get("settings");
  const newVenue = searchParams.get("newVenue");
  const editVenue = searchParams.get("editVenue");

  return (
    <div
      id="edit-overlay"
      className="bg-hdRed w-full h-full fixed hidden top-0 left-0 justify-center z-1001 overflow-y-scroll mb-10"
    >
      <div className="absolute inset-1 bg-[url(/SwirlPattern.svg)] w-full h-full top-0 left-0 bg-repeat pointer-events-none"></div>
      <div className="md:max-w-1/2">
        {settings ? <AccountSettings /> : null}
        {newVenue ? <NewVenue /> : null}
        {editVenue ? <EditVenue /> : null}
      </div>
    </div>
  );
}

export default EditOverlay;
