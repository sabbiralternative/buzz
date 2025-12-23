import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { MdOutlineContentCopy } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import toast from "react-hot-toast";
// import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { FaRegCopy } from "react-icons/fa";
import { DatePicker, Pagination } from "rsuite";
import EditPendingWithdraw from "../../modal/Master/Withdraw/EditPendingWithdraw";
import { AdminRole, clientColor, Status } from "../../../constant/constant";
import Loader from "../Loader/Loader";
import DefaultDateButton from "../../../pages/Report/DefaultDateButton";
import Slip from "../../modal/Master/Deposit/Slip";
import AddSlip from "../../modal/Master/Withdraw/AddSlip";
import DepositReport from "../../modal/Master/Deposit/DepositReport";

const Withdraw = ({
  data,
  title,
  time,
  meta,
  activePage,
  setActivePage,
  setAmountFrom,
  setAmountTo,
  amountFrom,
  amountTo,
  refetchAllWithdraw,
  isLoading,
  isSuccess,
  setBranchId,
  branches,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const {
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [showPendingWithdraw, setShowPendingWithdraw] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [addSlipId, setAddSlipId] = useState(null);
  const [depositReport, setDepositReport] = useState(null);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  const handleCopy = (item) => {
    const formattedText = `
    Client Id: ${item?.userId || ""}
    Amount: ${Math.abs(item?.amount) || ""}
    Bank Account Name: ${item?.bank_account_name || ""}
    Account Number: ${item?.account_number || ""}
    Bank Name: ${item?.bank_name || ""}
    IFSC: ${item?.ifsc || ""}
    Request Time: ${item?.date_added || ""}
  `;
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success("All data copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleNavigate = (client) => {
    if (!readOnly) {
      const formatUserId = client?.userId?.split("-")[1];
      navigate(
        `/pnl?id=${formatUserId}&role=${client?.role}&downlineId=${client?.downlineId}`
      );
    }
  };

  const status = data?.[0]?.status;

  return (
    <div className="card">
      {showImage && <Slip setShowImage={setShowImage} image={image} />}
      {depositReport && (
        <DepositReport
          setDepositReport={setDepositReport}
          depositReport={depositReport}
        />
      )}
      {addSlipId && (
        <AddSlip
          addSlipId={addSlipId}
          setAddSlipId={setAddSlipId}
          refetchAllWithdraw={refetchAllWithdraw}
        />
      )}
      {showPendingWithdraw && (
        <EditPendingWithdraw
          refetchAllWithdraw={refetchAllWithdraw}
          editPendingWithdraw={showPendingWithdraw}
          setEditPendingWithdraw={setShowPendingWithdraw}
        />
      )}
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="col-md-8 col-12 mb-4 ">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <h5 style={{ marginBottom: "0px" }}>{title}</h5>
            {(adminRole === AdminRole.branch_staff ||
              adminRole === AdminRole.punter) &&
              title === "Pending Withdraw" && (
                <Fragment>
                  <input
                    style={{ width: "200px" }}
                    onChange={(e) => setAmountFrom(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter From Amount"
                    value={amountFrom}
                  />
                  <input
                    style={{ width: "200px" }}
                    onChange={(e) => setAmountTo(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter To Amount"
                    value={amountTo}
                  />
                </Fragment>
              )}

            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master) &&
              title === "Pending Withdraw" && (
                <Fragment>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "260px",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "5px",
                    }}
                  >
                    <div style={{ fontSize: "15px" }}>Branch:</div>
                    <select
                      style={{ width: "200px" }}
                      defaultValue="0"
                      onChange={(e) => {
                        setBranchId(e.target.value);
                        setActivePage(1);
                      }}
                      className="form-control"
                    >
                      <option disabled value="">
                        Branch
                      </option>
                      <option value="0">All Branch</option>
                      {branches?.result?.map((site) => (
                        <option key={site?.branch_id} value={site?.branch_id}>
                          {site?.branch_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <input
                      style={{ width: "200px" }}
                      onChange={(e) => setAmountFrom(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter From Amount"
                      value={amountFrom}
                    />
                    <input
                      style={{ width: "200px" }}
                      onChange={(e) => setAmountTo(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter To Amount"
                      value={amountTo}
                    />
                  </div>
                </Fragment>
              )}
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {title !== "Pending Withdraw" && (
              <Fragment>
                <div style={{ width: "100%", maxWidth: "250px" }}>
                  <label htmlFor="flatpickr-range" className="form-label">
                    From Date
                  </label>
                  <DatePicker
                    style={{ width: "100%" }}
                    format="yyyy-MM-dd"
                    editable
                    onChange={(date) => setStartDate(date)}
                    value={startDate}
                    block
                  />
                </div>
                <div style={{ width: "100%", maxWidth: "250px" }}>
                  <label htmlFor="flatpickr-range" className="form-label">
                    To Date
                  </label>
                  <DatePicker
                    style={{ width: "100%" }}
                    format="yyyy-MM-dd"
                    editable
                    onChange={(date) => setEndDate(date)}
                    value={endDate}
                    block
                  />
                </div>
              </Fragment>
            )}

            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master) &&
              title !== "Pending Withdraw" && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                  }}
                >
                  <label htmlFor="flatpickr-range" className="form-label">
                    Branch
                  </label>
                  <select
                    style={{ width: "200px" }}
                    defaultValue="0"
                    onChange={(e) => {
                      setBranchId(e.target.value);
                      setActivePage(1);
                    }}
                    className="form-control"
                  >
                    <option disabled value="">
                      Branch
                    </option>
                    <option value="0">All Branch</option>
                    {branches?.result?.map((site) => (
                      <option key={site?.branch_id} value={site?.branch_id}>
                        {site?.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
          </div>
          {title !== "Pending Withdraw" && (
            <DefaultDateButton
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              lastThreeMonth={true}
              lastSixMonth={true}
              lastOneYear={true}
            />
          )}
        </div>

        {meta && (
          <Pagination
            prev
            next
            size="md"
            total={meta?.totalRecords}
            limit={meta?.recordsPerPage}
            activePage={activePage}
            onChangePage={setActivePage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        )}
      </div>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>User Id</th>
              <th>Login Name</th>
              {adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ||
              adminRole === AdminRole.branch_staff ? (
                <th>Branch Name</th>
              ) : null}
              {/* <th>Username</th> */}
              <th>Amount</th>
              {(status === Status.APPROVED || status === Status.REJECTED) && (
                <Fragment>
                  <th>Remark</th> <th>Slip</th>
                </Fragment>
              )}

              <th>Bank Account Name</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>IFSC</th>
              <th>UPI ID</th>
              <th>Status</th>
              <th>Request Time</th>
              {time && <th>{time}</th>}
              {(status === Status.APPROVED || status === Status.REJECTED) && (
                <th>
                  {status === Status.APPROVED ? "Approved By" : "Rejected By"}
                </th>
              )}
              {status === Status.PENDING &&
              (adminRole === "punter" || adminRole === "branch_staff") ? (
                <th>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {Array.isArray(data) &&
              data?.map((item, i) => {
                return (
                  <tr style={{ background: item?.bgcolor || "none" }} key={i}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.userId);
                        setRefetchViewClient(true);
                        navigate(
                          `/view-client?role=${adminRole}&history=withdraw`
                        );
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: clientColor?.[item?.color],
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      />
                      <strong> {item?.userId}</strong>
                    </td>
                    <td>{item?.loginnameVisible && item?.loginname}</td>
                    {adminRole === AdminRole.admin_staff ||
                    adminRole === AdminRole.hyper_master ||
                    adminRole === AdminRole.super_master ||
                    adminRole === AdminRole.branch_staff ? (
                      <td>{item?.branch_name}</td>
                    ) : null}
                    {/* <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.loginname);
                        setRefetchViewClient(true);
                        navigate("/view-client");
                      }}
                    >
                      {handleSplitUserName(item?.loginname)}
                    </td> */}
                    <td>{item?.amount}</td>
                    {(status === Status.APPROVED ||
                      status === Status.REJECTED) && (
                      <Fragment>
                        <td>{item.remark}</td>
                        <td>
                          {item?.withdraw_slip ? (
                            <span
                              onClick={() => {
                                setShowImage(true);
                                setImage(item?.withdraw_slip);
                              }}
                              style={{ color: "#346cee", cursor: "pointer" }}
                            >
                              View
                            </span>
                          ) : (
                            <div
                              onClick={() => setAddSlipId(item?.withdraw_id)}
                              style={{ cursor: "pointer" }}
                              className="text-danger"
                            >
                              Add
                            </div>
                          )}
                        </td>
                      </Fragment>
                    )}
                    {/* <td>{item?.mobile}</td> */}
                    <td>
                      {item?.bank_account_name}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(
                              item?.bank_account_name,
                              setMessage
                            )
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item?.account_number}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(
                              item?.account_number,
                              setMessage
                            )
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item?.bank_name}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          onClick={() =>
                            handleCopyToClipBoard(item?.bank_name, setMessage)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </td>
                    <td>
                      {item?.ifsc}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          onClick={() =>
                            handleCopyToClipBoard(item?.ifsc, setMessage)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}{" "}
                    </td>
                    <td>{item?.upi_id}</td>
                    <td>
                      <span
                        className={`badge me-1
                      ${
                        item?.status === Status.PENDING
                          ? "bg-label-warning"
                          : ""
                      }
                      ${
                        item?.status === Status.APPROVED
                          ? "bg-label-success"
                          : ""
                      }
                      ${
                        item?.status === Status.REJECTED
                          ? "bg-label-danger"
                          : ""
                      }
                      `}
                      >
                        {item?.status}
                      </span>
                    </td>

                    <td>{item?.date_added}</td>
                    {time && <td>{item?.date_modified}</td>}
                    {(item?.status === Status.APPROVED ||
                      item?.status === Status.REJECTED) && (
                      <td>{item?.modify_by}</td>
                    )}
                    {item?.status === Status.PENDING &&
                    (adminRole === "punter" || adminRole === "branch_staff") ? (
                      <>
                        <td>
                          <a
                            title="Text Edit"
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && setDownLineId(item?.withdraw_id);
                              !readOnly && setShowPendingWithdraw(true);
                            }}
                            className="btn btn-icon btn-sm btn-success"
                          >
                            <i className="bx bxs-edit"></i>
                          </a>
                          &nbsp;
                          <a
                            title="Copy All"
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && handleCopy(item);
                            }}
                            className="btn btn-icon btn-sm btn-primary"
                          >
                            <FaRegCopy size={15} />
                          </a>
                          &nbsp;
                          <a
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => handleNavigate(item)}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            PL
                          </a>
                          &nbsp;
                          {(adminRole === AdminRole.punter ||
                            adminRole === AdminRole.branch_staff) && (
                            <a
                              style={{
                                color: "white",
                                cursor: `${
                                  !readOnly ? "pointer" : "not-allowed"
                                }`,
                              }}
                              onClick={() => setDepositReport(item?.downlineId)}
                              className="btn btn-icon btn-sm btn-info"
                            >
                              DR
                            </a>
                          )}
                        </td>
                      </>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isLoading && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "20px",
            }}
          >
            <Loader />
          </div>
        )}

        {isSuccess && data?.length === 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              marginTop: "15px",
            }}
            className="card"
          >
            <h5
              style={{ fontSize: "18px", padding: "0px" }}
              className="card-header"
            >
              No{" "}
              {title === "Pending Withdraw"
                ? "pending"
                : title === "Completed Withdraw"
                ? "completed"
                : "rejected"}{" "}
              withdraw.
            </h5>
          </div>
        )}
        {meta && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Pagination
              prev
              next
              size="md"
              total={meta?.totalRecords}
              limit={meta?.recordsPerPage}
              activePage={activePage}
              onChangePage={setActivePage}
              maxButtons={5}
              ellipsis
              boundaryLinks
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
