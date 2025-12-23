import Loader from "../../../components/ui/Loader/Loader";
import { useGetIndex } from "../../../hooks";
import { useParams } from "react-router-dom";

const ChangeBranchReport = () => {
  const { userId } = useParams();

  const { data, isLoading, isSuccess } = useGetIndex({
    userId: userId?.substring(2),
    type: "changeBranchReport",
  });

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h5 className="card-header">Branch Transfer Report</h5>
          </div>

          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Old Branch Name</th>
                  <th>New Branch Name</th>
                  <th>Credit Limit</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.result?.map((method, i) => {
                  return (
                    <tr key={i}>
                      <td>{method?.old_branch_name}</td>
                      <td>{method?.new_branch_name}</td>
                      <td>{method?.credit_limit}</td>
                      <td>{method?.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {isLoading && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
        {isSuccess && data?.result?.length === 0 && (
          <div className="card">
            <h5 style={{ fontSize: "16px" }} className="card-header">
              No branch report found.
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeBranchReport;
