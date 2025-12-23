import { useLocation } from "react-router-dom";
import { Pagination } from "rsuite";
import "rsuite/Pagination/styles/index.css";
import { useState } from "react";
import { useGetActivityLogs } from "../../../hooks/activityLog";

const ActivityLogs = () => {
  const [activePage, setActivePage] = useState(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const id = params.get("id");
  const idWithOutP = id.split("-")[1];

  const { data } = useGetActivityLogs({
    page: activePage,
    id: idWithOutP,
    role,
  });

  const meta = data?.pagination;

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div
            className="card-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h5>Activity Logs</h5>
            <Pagination
              prev
              next
              size="md"
              total={meta?.totalRecords}
              limit={meta?.recordsPerPage}
              activePage={activePage}
              onChangePage={setActivePage}
              maxButtons={5}
              ellipsis
              boundaryLinks
            />
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>IP Address</th>
                  <th>Date</th>
                  <th>Narration</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((client, i) => {
                  return (
                    <tr key={i}>
                      <td
                        style={{ cursor: "pointer" }}
                        // onClick={() => {
                        //   setClientId(client?.userId);
                        //   setRefetchViewClient(true);
                        //   navigate("/view-client");
                        // }}
                      >
                        <strong>{client?.ip_address}</strong>
                      </td>

                      <td>{client?.date}</td>
                      <td>{client?.narration}</td>
                      <td>{client?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {meta && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Pagination
                  prev
                  next
                  size="md"
                  total={meta?.totalRecords}
                  limit={meta?.recordsPerPage}
                  activePage={activePage}
                  onChangePage={setActivePage}
                  maxButtons={5}
                  ellipsis
                  boundaryLinks
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLogs;
