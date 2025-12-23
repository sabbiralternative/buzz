import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { Pagination } from "rsuite";
import "rsuite/Pagination/styles/index.css";
import { useState } from "react";
import { useClient } from "../../../hooks/Master/Client/useClient";
import { clientColor } from "../../../constant/constant";
import Loader from "../../../components/ui/Loader/Loader";

const ClientWithBalance = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const { setRefetchViewClient, setClientId } = useContextState();
  const { data, isLoading, isSuccess } = useClient({
    searchId: "userWithCredit",
    page: activePage,
  });

  const handleNavigate = (client) => {
    const formatUserId = client?.userId?.split("-")[1];
    navigate(
      `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
    );
  };
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
            <h5>Clients</h5>
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
                  <th>User Id</th>
                  <th>Balance</th>
                  <th>Total Deposit</th>
                  <th>Total Withdraw</th>
                  <th>Betting Status</th>
                  <th>Status</th>
                  <th>Reg. Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((client, i) => {
                  return (
                    <tr key={i}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setClientId(client?.userId);
                          setRefetchViewClient(true);
                          navigate("/view-client");
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: clientColor?.[client?.color],
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        />
                        <strong>{client?.userId}</strong>
                      </td>

                      <td>
                        <strong>{client?.balance}</strong>
                      </td>
                      <td>{client?.totalDeposit}</td>
                      <td>{client?.totalWithdraw}</td>

                      <td>
                        <span
                          className={`badge  me-1 ${
                            client?.bettingStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {client?.bettingStatus === 1 ? "Active" : "InActive"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge  me-1 ${
                            client?.userStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {client?.userStatus === 1 ? "Active" : "InActive"}
                        </span>
                      </td>

                      <td>{client?.registrationDate}</td>
                      <td style={{ display: "flex", gap: "3px" }}>
                        <a
                          style={{ color: "white" }}
                          onClick={() => handleNavigate(client)}
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          PL
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

export default ClientWithBalance;
