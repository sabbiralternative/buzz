import { Fragment } from "react";
import { Link } from "react-router-dom";

const ClientPermission = ({
  readOnly,
  handleOpenModal,
  client,
  setShowChangeStatus,
  handleNavigate,
  adminRole,
  handleShowMore,
  i,
  showMore,
  showMoreRef,
  setShowChangePassword,
  clientPermission,
  depositPermission,
  withdrawPermission,
  setDirectDeposit,
  setDirectWithdraw,
  setClientDeposit,
}) => {
  return (
    <td style={{ display: "flex", gap: "3px" }}>
      {depositPermission && (
        <Fragment>
          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
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
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
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
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
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
      {clientPermission && (
        <Fragment>
          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
            }}
            onClick={() => {
              handleOpenModal(
                setShowChangePassword,
                client?.username,
                client?.role,
                client?.downlineId
              );
            }}
            className="btn btn-icon btn-sm btn-info"
          >
            P
          </a>

          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
            }}
            onClick={() => handleNavigate(client)}
            className="btn btn-icon btn-sm btn-warning"
          >
            PL
          </a>

          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
            }}
            onClick={() => {
              handleOpenModal(
                setShowChangeStatus,
                client?.username,
                client?.role,
                client?.downlineId
              );
            }}
            className="btn btn-icon btn-sm btn-dark"
          >
            S
          </a>
        </Fragment>
      )}

      {adminRole === "punter" ? (
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
              ref={showMoreRef}
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
              <li>
                <a className="dropdown-item">Another action</a>
              </li>
            </ul>
          )}
        </div>
      ) : null}
    </td>
  );
};

export default ClientPermission;
