import { useState } from "react";
import { useGetAllChecker } from "../../../hooks/HyperMaster/Staff";
import UpdateChecker from "../../../components/modal/HyperMaster/Staff/UpdateChecker";
import UpdatePassword from "../../../components/modal/HyperMaster/Staff/UpdatePassword";
import useContextState from "../../../hooks/useContextState";
import UpdatePermission from "../../../components/modal/Master/UpdatePermission";

const ViewChecker = () => {
  const { adminRole } = useContextState();
  const [updateStatusId, setUpdateStatusId] = useState(null);
  const [updatePasswordId, setUpdatePasswordId] = useState(null);
  const [showPermission, setShowPermission] = useState(null);
  const { data } = useGetAllChecker();

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
      {showPermission && (
        <UpdatePermission
          setShowPermission={setShowPermission}
          showPermission={showPermission}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">
            {adminRole === "punter" ? "Staff" : "Checkers"}
          </h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Staff Name</th>
                  <th>Username </th>
                  <th>Status </th>
                  {adminRole === "punter" ? <th>Permission</th> : <th>Role</th>}
                  <th>Reg. Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((checker, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <strong>{checker?.staff_name}</strong>
                      </td>
                      <td>{checker?.username}</td>

                      <td>
                        <span
                          className={`badge  me-1 ${
                            checker?.status === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {checker?.status === 1 ? "active" : "inactive"}
                        </span>
                      </td>

                      <td>{checker?.permissions}</td>

                      <td>{checker?.date}</td>
                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() => setUpdateStatusId(checker?.staff_id)}
                          className="btn btn-icon btn-sm btn-success"
                        >
                          S
                        </a>
                        &nbsp;
                        <a
                          onClick={() => setUpdatePasswordId(checker?.staff_id)}
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          P
                        </a>
                        &nbsp;
                        <a
                          onClick={() => setShowPermission(checker?.staff_id)}
                          className="btn btn-icon btn-sm btn-warning"
                        >
                          R
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

export default ViewChecker;
