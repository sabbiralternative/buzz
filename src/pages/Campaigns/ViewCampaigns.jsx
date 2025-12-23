import toast from "react-hot-toast";
import Loader from "../../components/ui/Loader/Loader";
import { useGetCampaigns } from "../../hooks/campaign";
import { MdOutlineContentCopy } from "react-icons/md";

const ViewCampaigns = () => {
  const { data, isLoading, isSuccess } = useGetCampaigns({
    type: "viewCampaign",
  });

  const handleCopyToClipBoard = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Campaign link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        {data?.result?.length > 0 && (
          <>
            <div className="card">
              <h5 className="card-header">Campaigns</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Campaign Id</th>
                      <th>Campaign Name</th>
                      <th>Campaign Link</th>
                      <th>Date Added</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {data?.result?.map((campaign, i) => {
                      return (
                        <tr key={i}>
                          <td>{campaign?.campaign_id}</td>
                          <td>{campaign?.campaign_name}</td>
                          <td>
                            {campaign?.campaign_link}
                            {campaign?.campaign_link && (
                              <MdOutlineContentCopy
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                }}
                                onClick={() =>
                                  handleCopyToClipBoard(campaign?.campaign_link)
                                }
                              />
                            )}
                          </td>
                          <td>{campaign?.date_added}</td>

                          <td>
                            <span
                              className={`badge  me-1 ${
                                campaign?.status === 1
                                  ? "bg-label-primary"
                                  : "bg-label-danger"
                              }`}
                            >
                              {campaign?.status === 1 ? "Active" : "InActive"}
                            </span>
                          </td>
                          <td style={{ display: "flex", gap: "3px" }}>
                            <a
                              style={{
                                color: "white",
                              }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              E
                            </a>

                            <a
                              style={{
                                color: "white",
                              }}
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              D
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {isLoading && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
        {isSuccess && data?.result?.length === 0 && (
          <div className="card">
            <h5 style={{ fontSize: "18px" }} className="card-header">
              No users found with given search query.
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewCampaigns;
