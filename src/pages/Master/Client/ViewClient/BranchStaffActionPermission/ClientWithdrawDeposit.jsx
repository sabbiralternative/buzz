const ClientWithdrawDeposit = ({
  readOnly,
  handleOpenModal,
  client,
  setClientDeposit,
  setDirectDeposit,
  setShowChangeStatus,
  handleNavigate,
  setDirectWithdraw,
  setShowChangePassword,
}) => {
  return (
    <td>
      {/* d */}
      <a
        style={{
          color: "white",
          cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
        }}
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
      &nbsp;
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
      &nbsp;
      {/* dd */}
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
    </td>
  );
};

export default ClientWithdrawDeposit;
