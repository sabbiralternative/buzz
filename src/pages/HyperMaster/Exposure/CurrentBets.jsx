import { useState } from "react";
import useContextState from "../../../hooks/useContextState";
import useCurrentBets from "../../../hooks/useCurrentBets";
import { useGetIndex } from "../../../hooks";
import { AdminRole } from "../../../constant/constant";
import { useNavigate } from "react-router-dom";
import { Pagination } from "rsuite";

const CurrentBets = () => {
  const navigate = useNavigate();
  const { adminRole, setClientId, setRefetchViewClient } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });
  const payload = { pagination: true, page: activePage };
  if (
    adminRole === AdminRole.hyper_master ||
    adminRole === AdminRole.admin_staff
  ) {
    payload.branch_id = branchId;
  }

  const { currentBets } = useCurrentBets(payload);

  const meta = currentBets?.pagination;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "15px",
              justifyContent: "space-between",
            }}
            className="card-header"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "15px",
                justifyContent: "space-between",
              }}
            >
              <h5 style={{ marginBottom: "0px" }}>Current Bets</h5>
              {adminRole === AdminRole.admin_staff && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div>Branch:</div>
                  <select
                    style={{ width: "200px" }}
                    defaultValue="0"
                    onChange={(e) => setBranchId(e.target.value)}
                    className="form-control"
                  >
                    <option disabled value="">
                      Branch
                    </option>
                    <option value="0">All Branch</option>
                    {branches?.result?.map((site) => (
                      <option key={site?.branch_id} value={site?.branch_id}>
                        {site?.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="table-responsive mt-4 mt-xl-0">
              <table className="table table-hover table-striped align-middle table-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col">Event Type</th>
                    <th scope="col">Event Name</th>
                    <th scope="col">User Id</th>
                    <th scope="col">M Name</th>
                    <th scope="col">Nation</th>
                    <th scope="col">U Rate</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Place Date</th>
                    <th scope="col">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBets?.result?.map((betData, i) => {
                    return (
                      <tr
                        key={i}
                        className={`${
                          betData?.betType === "Back" ? "BACK" : "LAY"
                        }`}
                      >
                        <td style={{ color: "black" }} className="fw-medium">
                          {" "}
                          {betData?.sports}
                        </td>
                        <td style={{ color: "black" }}>
                          {" "}
                          {betData?.eventName}
                        </td>
                        <td
                          onClick={() => {
                            setClientId(`P-${betData?.userId}`);
                            setRefetchViewClient(true);
                            navigate("/view-client");
                          }}
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          <span>P-</span>
                          <span> {betData?.userId}</span>
                        </td>
                        <td style={{ color: "black" }}>
                          {" "}
                          {betData?.marketName}
                        </td>
                        <td style={{ color: "black" }}>{betData?.nation}</td>
                        <td style={{ color: "black" }}>{betData?.userRate}</td>
                        <td style={{ color: "black" }}>{betData?.amount}</td>
                        <td style={{ color: "black" }}>{betData?.placeDate}</td>
                        <td style={{ color: "black" }}>{betData?.ipAddress}</td>
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
      </div>
    </div>
  );
};

export default CurrentBets;
