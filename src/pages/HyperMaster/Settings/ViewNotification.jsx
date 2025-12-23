import { useGetIndex } from "../../../hooks";
import { MdDelete } from "react-icons/md";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import toast from "react-hot-toast";

const ViewNotification = () => {
  const { data, isSuccess, refetch } = useGetIndex({
    type: "viewNotification",
  });

  const handleDeleteNotification = async (id) => {
    const payload = {
      notification_id: id,
      type: "deleteNotification",
    };
    const { data } = await AxiosSecure.post(API.index, payload);

    if (data?.success) {
      refetch();
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.result?.message);
    }
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        {data?.result?.length > 0 && (
          <>
            <div className="card">
              <h5 className="card-header">View Notification</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th>Notification Text</th>

                      <th>Site</th>
                      <th>Date Added</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {data?.result?.map((notification, i) => {
                      return (
                        <tr key={i}>
                          <td>{notification?.notification_text}</td>

                          <td>{notification?.site}</td>

                          <td>{notification?.date_added}</td>
                          <td>
                            <MdDelete
                              onClick={() =>
                                handleDeleteNotification(
                                  notification?.notification_id
                                )
                              }
                              style={{ cursor: "pointer" }}
                              color="#ff5b5c"
                              size={24}
                            />
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

        {isSuccess && data?.result?.length === 0 && (
          <div className="card">
            <h5 style={{ fontSize: "18px" }} className="card-header">
              No notification found.
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewNotification;
