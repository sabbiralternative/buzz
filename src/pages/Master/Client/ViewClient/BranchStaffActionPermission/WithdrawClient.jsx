const WithdrawClient = ({
  readOnly,
  handleOpenModal,
  client,
  setShowChangeStatus,
  handleNavigate,
  setDirectWithdraw,
  setShowChangePassword,
}) => {
  return (
    <td>
      {/* w */}
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
      {/* p */}
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
      &nbsp;
      {/* s */}
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
      &nbsp;
      {/* pl */}
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
    </td>
  );
};

export default WithdrawClient;
