import { useForm } from "react-hook-form";
import useContextState from "../../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import useGetClient from "../../../../hooks/Master/Client/useGetClient";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { clientColor } from "../../../../constant/constant";
import Loader from "../../../../components/ui/Loader/Loader";

const ViewClient = () => {
  const showMoreRef = useRef(null);
  const [showMore, setShowMore] = useState(null);
  const navigate = useNavigate();
  const [fetchClients, setFetchClients] = useState(false);
  const { handleSubmit } = useForm();

  const {
    clientId,
    setClientId,

    refetchViewClient,
    setRefetchViewClient,
  } = useContextState();
  const { clients, refetchClients, isSuccess, isLoading } = useGetClient(
    clientId,
    setFetchClients,
    fetchClients
  );

  const onSubmit = async () => {
    setFetchClients(true);
    refetchClients();
  };
  const handleNavigate = (client) => {
    const formatUserId = client?.userId?.split("-")[1];
    navigate(
      `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
    );
  };

  useEffect(() => {
    if (refetchViewClient) {
      setFetchClients(true);
      refetchClients();
      setRefetchViewClient(false);
    }
  }, [refetchClients, refetchViewClient, setRefetchViewClient, setClientId]);

  useCloseModalClickOutside(showMoreRef, () => {
    setShowMore(null);
  });

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                id="formValidationExamples"
                className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-md-6 fv-plugins-icon-container">
                  <input
                    onChange={(e) => setClientId(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search Client"
                    value={clientId}
                  />
                  <div className="fv-plugins-message-container invalid-feedback"></div>
                </div>

                <div className="col-12">
                  <input
                    disabled={clientId?.length < 2}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="Search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {clients?.length > 0 && (
          <>
            <hr className="my-3" />
            <div className="card">
              <h5 className="card-header">Clients</h5>
              <div
                className="table-responsive text-nowrap"
                style={{ minHeight: showMore !== null ? "300px" : "auto" }}
              >
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
                    {clients?.map((client, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <span
                              style={{
                                backgroundColor: clientColor?.[client?.color],
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            ></span>
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
                              {client?.bettingStatus === 1
                                ? "Active"
                                : "InActive"}
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
                              style={{
                                color: "white",
                              }}
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
        {isSuccess && clients?.length === 0 && (
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

export default ViewClient;
