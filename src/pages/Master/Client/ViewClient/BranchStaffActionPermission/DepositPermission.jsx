const DepositPermission = ({
  readOnly,
  handleNavigate,
  handleOpenModal,
  setClientDeposit,
  client,
  setDirectDeposit,
  setShowChangeStatus,
}) => {
  return (
    <td>
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
      &nbsp;
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

export default DepositPermission;
