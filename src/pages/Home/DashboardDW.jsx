const DashboardDW = ({ data, emptyMessage, title }) => {
  return (
    <div className="card" style={{ width: "100%" }}>
      <h5 className="card-header">{title}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>BranchName</th>
              <th>Count</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data && data?.length > 0 ? (
              data?.map((dw, i) => {
                return (
                  <tr key={i}>
                    <td>{dw?.branchName}</td>
                    <td>{dw?.count}</td>
                    <td>{dw?.amount}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td></td>
                <td>
                  <h6 style={{ marginTop: "10px" }}> {emptyMessage}</h6>
                </td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardDW;
