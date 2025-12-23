import useContextState from "../../../hooks/useContextState";
import useGetAllBranch from "../../../hooks/HyperMaster/Branch/useGetAllBranch";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import Deposit from "../../../components/modal/HyperMaster/Branch/Deposit";
import Withdraw from "../../../components/modal/HyperMaster/Branch/Withdraw";
import ChangePassword from "../../../components/modal/ChangePassword";
import ChangeStatus from "../../../components/modal/ChangeStatus";
import CreditReference from "../../../components/modal/CreditReference";
import { useState } from "react";

const ViewSuperBranches = () => {
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showCreditRef, setShowCreditRef] = useState(false);
  const [downLineId, setDownLineId] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const { branches, refetchAllBranch } = useGetAllBranch({
    branch_type: "super_branch",
  });
  const { token, adminRole } = useContextState();
  const navigate = useNavigate();

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  /* Handle login read only without password */
  const handleLoginReadOnly = async (username) => {
    const generatedToken = handleRandomToken();
    const payload = {
      username,
      token: generatedToken,
    };
    const res = await axios.post(API.loginReadOnly, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      const baseUrl = window.location.origin;
      const readOnlyLoginCredential = {
        token: data?.result?.token,
        site: data?.result?.site,
        role: data?.result?.role,
        loginname: data?.result?.loginname,
        readOnly: data?.result?.readOnly,
      };
      const readOnlyLoginData = encodeURIComponent(
        JSON.stringify(readOnlyLoginCredential)
      );
      const newTabUrl = `${baseUrl}?data=${readOnlyLoginData}`;
      window.open(newTabUrl, "_blank");
    }
  };

  return (
    <>
      {showCreditRef && (
        <CreditReference
          id={id}
          role={role}
          setShowCreditRef={setShowCreditRef}
          downlineId={downLineId}
          refetchAllBranch={refetchAllBranch}
        />
      )}
      {showChangeStatus && (
        <ChangeStatus
          id={id}
          role={role}
          setShowChangeStatus={setShowChangeStatus}
          downlineId={downLineId}
          registrationStatus={registrationStatus}
          refetchAllBranch={refetchAllBranch}
        />
      )}
      {showChangePassword && (
        <ChangePassword
          id={id}
          role={role}
          setShowChangePassword={setShowChangePassword}
          downlineId={downLineId}
          refetchAllBranch={refetchAllBranch}
        />
      )}
      {showDeposit && (
        <Deposit
          id={id}
          role={role}
          downlineId={downLineId}
          setShowDeposit={setShowDeposit}
          refetchAllBranch={refetchAllBranch}
        />
      )}
      {showWithdraw && (
        <Withdraw
          id={id}
          role={role}
          downlineId={downLineId}
          setShowWithdraw={setShowWithdraw}
          refetchAllBranch={refetchAllBranch}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Branches</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Username</th>
                  <th>Credit Reference</th>
                  <th>Balance</th>
                  <th>P/L</th>
                  <th>Status</th>
                  <th>Betting Status</th>

                  <th>Reg. Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {branches?.map((branch, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <strong>{handleSplitUserName(branch?.username)}</strong>
                      </td>
                      <td>{branch?.creditReferance}</td>
                      <td>{branch?.balance}</td>
                      <td>{branch?.pnl}</td>

                      <td>
                        <span
                          className={`badge  me-1 ${
                            branch?.userStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {branch?.userStatus === 1 ? "active" : "inactive"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge  me-1 ${
                            branch?.bettingStatus === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {branch?.bettingStatus === 1 ? "active" : "inactive"}
                        </span>
                      </td>

                      <td>{branch?.registrationDate}</td>
                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() => {
                            setShowDeposit(true);
                            setDownLineId(branch?.username);
                            setRole(branch?.role);
                            setId(branch?.id);
                          }}
                          className="btn btn-icon btn-sm btn-success"
                        >
                          D
                        </a>
                        &nbsp;
                        <a
                          onClick={() => {
                            setShowWithdraw(true);
                            setDownLineId(branch?.username);
                            setRole(branch?.role);
                            setId(branch?.id);
                          }}
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          W
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          onClick={() => {
                            handleNavigate(branch?.username, "pnl");
                          }}
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          PL
                        </a>
                        &nbsp;
                        <a
                          onClick={() => {
                            setShowChangePassword(true);
                            setDownLineId(branch?.username);
                            setRole(branch?.role);
                            setId(branch?.id);
                          }}
                          className="btn btn-icon btn-sm btn-info"
                        >
                          P
                        </a>
                        &nbsp;
                        <a
                          onClick={() => {
                            setShowChangeStatus(true);
                            setDownLineId(branch?.username);
                            setRole(branch?.role);
                            setId(branch?.id);
                            setRegistrationStatus(branch?.registrationStatus);
                          }}
                          className="btn btn-icon btn-sm btn-dark"
                        >
                          S
                        </a>
                        &nbsp;
                        <a
                          style={{ color: "white" }}
                          onClick={() => {
                            setShowCreditRef(true);
                            setDownLineId(branch?.username);
                            setRole(branch?.role);
                            setId(branch?.id);
                          }}
                          className="btn btn-icon btn-sm btn-primary"
                        >
                          CR
                        </a>
                        &nbsp;
                        {adminRole === "hyper_master" && (
                          <a
                            style={{
                              color: "white",
                              backgroundColor: "lightseagreen",
                            }}
                            onClick={() =>
                              handleLoginReadOnly(branch?.username)
                            }
                            className="btn btn-icon btn-sm btn-read-only-login"
                          >
                            L
                          </a>
                        )}
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

export default ViewSuperBranches;
