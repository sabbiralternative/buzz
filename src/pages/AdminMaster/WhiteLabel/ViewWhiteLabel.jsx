import { useState } from "react";
import UpdateChecker from "../../../components/modal/HyperMaster/Staff/UpdateChecker";
import UpdatePassword from "../../../components/modal/HyperMaster/Staff/UpdatePassword";
import { useWhiteLabel } from "../../../hooks/AdminMaster/whiteLabel";

const ViewWhiteLabel = () => {
  const [updateStatusId, setUpdateStatusId] = useState(null);
  const [updatePasswordId, setUpdatePasswordId] = useState(null);
  const { data } = useWhiteLabel({
    type: "viewWhitelabel",
  });

  return (
    <>
      {updateStatusId && (
        <UpdateChecker
          setUpdateStatusId={setUpdateStatusId}
          updateStatusId={updateStatusId}
        />
      )}
      {updatePasswordId && (
        <UpdatePassword
          setUpdatePasswordId={setUpdatePasswordId}
          updatePasswordId={updatePasswordId}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">White Label</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Site Name</th>
                  <th>Site URL</th>
                  <th>Admin</th>
                  <th>Theme</th>
                  <th>Deposit Limit</th>
                  <th>Withdraw Limit</th>
                  <th>Casino Currency </th>
                  <th>Currency </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((whiteLabel, i) => {
                  return (
                    <tr key={i}>
                      <td>{whiteLabel?.site_name}</td>
                      <td>{whiteLabel?.site_url}</td>
                      <td>{whiteLabel?.admin}</td>
                      <td>{whiteLabel?.theme}</td>
                      <td>{whiteLabel?.deposit_limit}</td>
                      <td>{whiteLabel?.withdraw_limit}</td>
                      <td>{whiteLabel?.casino_currency}</td>
                      <td>{whiteLabel?.currency}</td>

                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          // onClick={() =>
                          //   handleDownLineId(
                          //     setShowDeposit,
                          //     branch?.username,
                          //     setDownLineId
                          //   )
                          // }
                          className="btn btn-icon btn-sm btn-success"
                        >
                          D
                        </a>
                        &nbsp;
                        <a
                          // onClick={() =>
                          //   handleDownLineId(
                          //     setShowWithdraw,
                          //     branch?.username,
                          //     setDownLineId
                          //   )
                          // }
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          W
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          // onClick={() => {
                          //   handleNavigate(branch?.username, "pnl");
                          // }}
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          PL
                        </a>
                        &nbsp;
                        <a
                          // onClick={() => {
                          //   handleDownLineId(
                          //     setShowChangePassword,
                          //     branch?.username,
                          //     setDownLineId
                          //   );
                          // }}
                          className="btn btn-icon btn-sm btn-info"
                        >
                          P
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          // onClick={() =>
                          //   handleDownLineId(
                          //     setShowCreditRef,
                          //     branch?.username,
                          //     setDownLineId
                          //   )
                          // }
                          className="btn btn-icon btn-sm btn-primary"
                        >
                          CR
                        </a>
                        &nbsp;
                        <a
                          style={{
                            color: "white",
                            backgroundColor: "lightseagreen",
                          }}
                          // onClick={() =>
                          //   handleLoginReadOnly(branch?.username)
                          // }
                          className="btn btn-icon btn-sm btn-read-only-login"
                        >
                          L
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWhiteLabel;
