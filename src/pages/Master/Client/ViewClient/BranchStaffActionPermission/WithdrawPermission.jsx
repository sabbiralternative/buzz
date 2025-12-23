const WithdrawPermission = ({
  readOnly,
  handleOpenModal,
  setDirectWithdraw,
  client,
  setShowChangeStatus,
  handleNavigate,
}) => {
  return (
    <td>
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
      &nbsp;
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
      &nbsp;
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
    </td>
  );
};

export default WithdrawPermission;
