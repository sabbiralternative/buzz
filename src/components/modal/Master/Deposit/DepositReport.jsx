import { useRef } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useGetIndex } from "../../../../hooks";

const DepositReport = ({ setDepositReport, depositReport }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setDepositReport(false);
  });
  const { data, isSuccess } = useGetIndex({
    downlineId: depositReport,
    type: "viewDepositReport",
  });

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "80vw" }}
        >
          <div className="modal-content" ref={ref}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Deposit Report
              </h5>
              <button
                onClick={() => setDepositReport(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <div className="modal-body">
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>Bank Account Name</th>
                        <th>Account Number</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {data?.result?.length > 0 &&
                        data?.result?.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item?.bank_name}</td>
                              <td>{item?.account_number}</td>
                              <td>{item?.amount}</td>
                              <td>{item?.date}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {isSuccess && data?.result?.length === 0 && (
                  <div className="card">
                    <h5 style={{ fontSize: "18px" }} className="card-header">
                      No deposit report found
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositReport;
