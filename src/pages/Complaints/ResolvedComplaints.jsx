import useComplaints from "../../hooks/complaints";
import { useState } from "react";
import { Pagination } from "rsuite";
import Loader from "../../components/ui/Loader/Loader";

const ResolvedComplaints = () => {
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading, isSuccess } = useComplaints({
    type: "viewComplaint",
    status: 1,
    page: activePage,
  });
  const meta = data?.pagination;
  const result = data?.result;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h5 className="card-header">Resolved Complaints</h5>
          </div>
          {meta && (
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
          )}
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>User Name</th>
                <th>Mobile</th>
                <th>Branch Name</th>
                <th>Message</th>
                <th>Admin Message</th>

                <th>Status</th>
                <th>Date Added</th>
                <th>Statement Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {Array.isArray(result) &&
                result?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item?.complaint_id}</td>
                      <td>{item?.username}</td>
                      <td>{item?.mobile}</td>
                      <td>{item?.branch_name}</td>
                      <td>{item?.message}</td>
                      <td>{item?.admin_message}</td>

                      <td
                        className={`badge me-1 bg-label-success
                      
                      `}
                      >
                        Resolved
                      </td>
                      <td>{item?.date_added}</td>
                      <td>{item?.statement_type}</td>

                      <td>
                        <a
                          style={{
                            color: "white",
                          }}
                          className="btn btn-icon btn-sm btn-success"
                        >
                          E
                        </a>
                        &nbsp;
                        <a
                          style={{
                            color: "white",
                          }}
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          V
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {isLoading && !isSuccess && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "20px",
              }}
            >
              <Loader />
            </div>
          )}

          {isSuccess && result?.length === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: "30px",
              }}
            >
              No complaints found
            </div>
          )}

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
  );
};

export default ResolvedComplaints;
