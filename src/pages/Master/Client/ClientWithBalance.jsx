import useContextState from "../../../hooks/useContextState";
import { Link, useNavigate } from "react-router-dom";
// import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { Pagination } from "rsuite";
import "rsuite/Pagination/styles/index.css";
import { useEffect, useRef, useState } from "react";
import DirectWithdraw from "../../../components/modal/Master/Client/DirectWithdraw";
import { useClient } from "../../../hooks/Master/Client/useClient";
import ChangePassword from "../../../components/modal/ChangePassword";
import ClientDeposit from "../../../components/modal/Master/Client/Deposit";
import DirectDeposit from "../../../components/modal/Master/Client/DirectDeposit";
import ChangeStatus from "../../../components/modal/ChangeStatus";
import CreditReference from "../../../components/modal/CreditReference";
import { AdminRole, clientColor } from "../../../constant/constant";
import { jwtDecode } from "jwt-decode";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import ChangeColor from "../../../components/modal/ChangeColor";
import ChangeBranch from "../../../components/modal/HyperMaster/Client/ChangeBranch";
import handleNavigateToWhatsApp from "../../../utils/handleNavigateToWhatsApp";
import Loader from "../../../components/ui/Loader/Loader";
import { Fragment } from "react";

const ClientWithBalance = () => {
  const [showColor, setShowColor] = useState(false);
  const [clientPermission, setClientPermission] = useState(false);
  const [depositPermission, setDepositPermission] = useState(false);
  const [withdrawPermission, setWithdrawPermission] = useState(false);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [directWithdraw, setDirectWithdraw] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [clientDeposit, setClientDeposit] = useState(false);
  const [directDeposit, setDirectDeposit] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showCreditRef, setShowCreditRef] = useState(false);
  const [downLineId, setDownLineId] = useState("");
  const [payloadRole, setPayloadRole] = useState("");
  const [id, setId] = useState("");
  const [showChangeBranch, setShowChangeBranch] = useState(false);

  const { adminRole, setRefetchViewClient, setClientId, readOnly, token } =
    useContextState();
  const [showMore, setShowMore] = useState(null);

  const showMoreRef = useRef();
  useCloseModalClickOutside(showMoreRef, () => {
    setShowMore(null);
  });

  const handleShowMore = (i) => {
    if (i === showMore) {
      setShowMore(null);
    } else {
      setShowMore(i);
    }
  };

  const {
    data,
    refetch: refetchClient,
    isLoading,
    isSuccess,
  } = useClient({
    searchId: "userWithCredit",
    page: activePage,
  });

  const handleNavigate = (client) => {
    if (!readOnly) {
      const formatUserId = client?.userId?.split("-")[1];
      navigate(
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
      );
    }
  };
  const meta = data?.pagination;

  const handleOpenModal = (setModal, username, role, id) => {
    setModal(true), setDownLineId(username), setPayloadRole(role), setId(id);
  };

  useEffect(() => {
    if (adminRole) {
      if (adminRole === "branch_staff") {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;

        const depositPermission = permissions?.includes("deposit") ?? false;
        const withdrawPermission = permissions?.includes("withdraw") ?? false;
        const clientPermission = permissions?.includes("client") ?? false;
        setDepositPermission(depositPermission);
        setWithdrawPermission(withdrawPermission);
        setClientPermission(clientPermission);
      } else {
        setDepositPermission(true);
        setWithdrawPermission(true);
        setClientPermission(true);
      }
    }
  }, [adminRole, token]);

  return (
    <>
      {clientDeposit && (
        <ClientDeposit
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setClientDeposit={setClientDeposit}
        />
      )}

      {directWithdraw && (
        <DirectWithdraw
          id={id}
          role={payloadRole}
          downlineId={downLineId}
          setDirectWithdraw={setDirectWithdraw}
        />
      )}

      {showChangePassword && (
        <ChangePassword
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowChangePassword={setShowChangePassword}
        />
      )}
      {showChangeStatus && (
        <ChangeStatus
          downlineId={downLineId}
          id={id}
          registrationStatus={null}
          role={payloadRole}
          setShowChangeStatus={setShowChangeStatus}
        />
      )}
      {showCreditRef && (
        <CreditReference
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowCreditRef={setShowCreditRef}
        />
      )}
      {directDeposit && (
        <DirectDeposit
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setDirectDeposit={setDirectDeposit}
        />
      )}
      {showColor && (
        <ChangeColor
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowColor={setShowColor}
        />
      )}
      {showChangeBranch && (
        <ChangeBranch
          downlineId={downLineId}
          id={id}
          role={payloadRole}
          setShowChangeBranch={setShowChangeBranch}
          refetchClient={refetchClient}
        />
      )}
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
                  {data?.result?.[0]?.username2Visible && <th>Username</th>}
                  {adminRole == AdminRole.hyper_master ||
                  adminRole == "admin_staff" ? (
                    <th>Branch</th>
                  ) : null}
                  {/* {adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.admin_master ? (
                    <th>Username</th>
                  ) : null} */}
                  {adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.admin_master ? (
                    <th>Mobile</th>
                  ) : null}
                  <th>Balance</th>
                  <th>Total Deposit</th>
                  <th>Total Withdraw</th>
                  <th>Exposure</th>
                  <th>Betting Status</th>
                  <th>Status</th>
                  <th>Site</th>
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
                      {client?.username2Visible && <td>{client?.username2}</td>}
                      {adminRole == AdminRole.hyper_master ||
                      adminRole == "admin_staff" ? (
                        <td>
                          <strong>{client?.branch}</strong>
                        </td>
                      ) : null}
                      {/* {adminRole === AdminRole.hyper_master ||
                      adminRole === AdminRole.admin_master ? (
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setClientId(client?.username);
                            setRefetchViewClient(true);
                            navigate("/view-client");
                          }}
                        >
                          <strong>
                            {handleSplitUserName(client?.username)}
                          </strong>
                        </td>
                      ) : null} */}

                      {adminRole === AdminRole.hyper_master ||
                      adminRole === AdminRole.admin_master ? (
                        <td
                          style={{
                            cursor:
                              adminRole === AdminRole.hyper_master
                                ? "pointer"
                                : "auto",
                          }}
                          onClick={() =>
                            handleNavigateToWhatsApp(adminRole, client?.mobile)
                          }
                        >
                          <strong>{client?.mobile}</strong>
                        </td>
                      ) : null}

                      <td>
                        <strong>{client?.balance}</strong>
                      </td>
                      <td>{client?.totalDeposit}</td>
                      <td>{client?.totalWithdraw}</td>
                      <td>
                        {client?.exposure || client?.exposure == 0
                          ? Number(client.exposure).toFixed(0)
                          : client?.exposure}
                      </td>
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
                      <td>{client?.site}</td>
                      <td>{client?.registrationDate}</td>
                      <td style={{ display: "flex", gap: "3px" }}>
                        {adminRole !== "hyper_master" &&
                          adminRole !== AdminRole.branch_staff &&
                          adminRole !== "admin_staff" && (
                            <>
                              <a
                                style={{ color: "white" }}
                                onClick={() =>
                                  handleOpenModal(
                                    setClientDeposit,
                                    client?.username,
                                    client?.role,
                                    client?.downlineId
                                  )
                                }
                                className="btn btn-icon btn-sm btn-success"
                              >
                                D
                              </a>

                              <a
                                style={{ color: "white" }}
                                onClick={() =>
                                  handleOpenModal(
                                    setDirectWithdraw,
                                    client?.username,
                                    client?.role,
                                    client?.downlineId
                                  )
                                }
                                className="btn btn-icon btn-sm btn-danger"
                              >
                                W
                              </a>
                            </>
                          )}
                        {adminRole !== AdminRole.branch_staff && (
                          <>
                            <a
                              style={{ color: "white" }}
                              onClick={() => handleNavigate(client)}
                              className="btn btn-icon btn-sm btn-warning"
                            >
                              PL
                            </a>
                          </>
                        )}
                        {clientPermission && adminRole !== AdminRole.punter && (
                          <>
                            {depositPermission && (
                              <Fragment>
                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
                                  onClick={() => {
                                    handleOpenModal(
                                      setDirectDeposit,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-success"
                                >
                                  DD
                                </a>

                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
                                  onClick={() => {
                                    handleOpenModal(
                                      setClientDeposit,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-primary"
                                >
                                  D
                                </a>
                              </Fragment>
                            )}
                            {withdrawPermission && (
                              <Fragment>
                                <a
                                  style={{
                                    color: "white",
                                    cursor: `${
                                      !readOnly ? "pointer" : "not-allowed"
                                    }`,
                                  }}
                                  onClick={() => {
                                    handleOpenModal(
                                      setDirectWithdraw,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                  className="btn btn-icon btn-sm btn-danger"
                                >
                                  W
                                </a>
                              </Fragment>
                            )}
                            <a
                              style={{ color: "white" }}
                              onClick={() => {
                                setShowMore(false);
                                handleOpenModal(
                                  setShowChangePassword,
                                  client?.username,
                                  client?.role,
                                  client?.downlineId
                                );
                              }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              P
                            </a>
                            {adminRole !== "admin_staff" && (
                              <a
                                style={{ color: "white" }}
                                onClick={() => {
                                  setShowMore(false);
                                  handleOpenModal(
                                    setShowChangeStatus,
                                    client?.username,
                                    client?.role,
                                    client?.downlineId
                                  );
                                }}
                                className="btn btn-icon btn-sm btn-label-secondary"
                              >
                                S
                              </a>
                            )}
                          </>
                        )}
                        {adminRole == AdminRole.hyper_master ||
                        adminRole === AdminRole.admin_staff ? (
                          <Fragment>
                            <a
                              style={{ color: "white" }}
                              onClick={() =>
                                navigate(
                                  `/change-branch-report/${client?.userId}`
                                )
                              }
                              className="btn btn-icon btn-sm btn-info"
                            >
                              B
                            </a>
                            <a
                              style={{ color: "white" }}
                              onClick={() => {
                                handleOpenModal(
                                  setShowChangeBranch,
                                  client?.username,
                                  client?.role,
                                  client?.downlineId
                                );
                              }}
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              M
                            </a>
                          </Fragment>
                        ) : null}
                        {adminRole !== AdminRole.hyper_master &&
                          adminRole !== AdminRole.branch_staff &&
                          adminRole !== "admin_staff" && (
                            <>
                              <a
                                style={{
                                  color: "white",
                                }}
                                onClick={() => {
                                  handleOpenModal(
                                    setDirectDeposit,
                                    client?.username,
                                    client?.role,
                                    client?.downlineId
                                  );
                                }}
                                className="btn btn-icon btn-sm btn-success"
                              >
                                DD
                              </a>
                            </>
                          )}

                        {adminRole === "punter" ||
                        adminRole === AdminRole.branch_staff ? (
                          <div className="btn-group">
                            <button
                              onClick={() => handleShowMore(i)}
                              style={{
                                height: "auto",
                                width: "auto",
                                padding: "0px 2px",
                              }}
                              type="button"
                              className="btn btn-primary btn-icon  dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>

                            {i === showMore && (
                              <div
                                style={{
                                  height: "100vh",
                                  width: "100vw",
                                  position: "fixed",
                                  top: "0",
                                  left: "0",
                                  right: "0",
                                  bottom: "0",
                                  zIndex: 999,
                                }}
                              />
                            )}
                            {i === showMore && (
                              <ul
                                // ref={showMoreRef}
                                style={{
                                  display: "block",
                                  right: "0px",
                                  top: "25px",
                                  zIndex: 9999,
                                }}
                                className="dropdown-menu dropdown-menu-end"
                              >
                                <li>
                                  <Link
                                    to={`/activity-logs?role=${client?.role}&id=${client?.userId}`}
                                    className="dropdown-item"
                                  >
                                    Activity Logs
                                  </Link>
                                </li>
                                <li
                                  onClick={() => {
                                    setShowMore(false);
                                    handleOpenModal(
                                      setShowColor,
                                      client?.username,
                                      client?.role,
                                      client?.downlineId
                                    );
                                  }}
                                >
                                  <a className="dropdown-item">Client Group</a>
                                </li>
                                {clientPermission &&
                                  adminRole !== "admin_staff" && (
                                    <>
                                      <li
                                        onClick={() => {
                                          setShowMore(false);
                                          handleOpenModal(
                                            setShowChangePassword,
                                            client?.username,
                                            client?.role,
                                            client?.downlineId
                                          );
                                        }}
                                      >
                                        <a className="dropdown-item">
                                          Change Password
                                        </a>
                                      </li>
                                      <li
                                        onClick={() => {
                                          setShowMore(false);
                                          handleOpenModal(
                                            setShowChangeStatus,
                                            client?.username,
                                            client?.role,
                                            client?.downlineId
                                          );
                                        }}
                                      >
                                        <a className="dropdown-item">
                                          Change Status
                                        </a>
                                      </li>
                                    </>
                                  )}
                                {adminRole !== AdminRole.hyper_master &&
                                  adminRole !== AdminRole.branch_staff &&
                                  adminRole !== "admin_staff" && (
                                    <li
                                      onClick={() => {
                                        setShowMore(false);
                                        handleOpenModal(
                                          setShowCreditRef,
                                          client?.username,
                                          client?.role,
                                          client?.downlineId
                                        );
                                      }}
                                    >
                                      <a className="dropdown-item">
                                        Credit Reference
                                      </a>
                                    </li>
                                  )}
                              </ul>
                            )}
                          </div>
                        ) : null}
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
