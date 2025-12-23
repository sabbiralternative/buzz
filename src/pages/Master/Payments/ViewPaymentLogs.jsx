import { useParams } from "react-router-dom";
import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";
import Loader from "../../../components/ui/Loader/Loader";
import { useState } from "react";

const ViewPaymentLogs = () => {
  const [page] = useState(1);
  const { paymentId } = useParams();
  const payload = {
    type: "viewPaymentLogs",
    paymentId,
    page,
  };
  const { paymentsMethods, isLoading, isSuccess } =
    useGetPaymentMethod(payload);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Payment Logs</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {paymentsMethods?.map((payment, i) => {
                  let paymentTypeBg = "";
                  if (payment?.type === "ACTIVATED") {
                    paymentTypeBg = "bg-label-primary";
                  } else if (payment?.type === "DEACTIVATED") {
                    paymentTypeBg = "bg-label-warning";
                  } else if (payment?.type === "DELETED") {
                    paymentTypeBg = "bg-label-danger";
                  } else if (payment?.type === "NEW_ADDED") {
                    paymentTypeBg = "bg-label-success";
                  }
                  return (
                    <tr key={i}>
                      <td>{payment?.id}</td>

                      <td>
                        <span className={`badge  me-1 ${paymentTypeBg}`}>
                          {payment?.type}
                        </span>
                      </td>

                      <td>{payment?.date}</td>
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
        {isSuccess && paymentsMethods?.length === 0 && (
          <div className="card">
            <h5 style={{ fontSize: "18px" }} className="card-header">
              No logs found
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewPaymentLogs;
