import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useEffect, useState } from "react";
import Slip from "../../modal/Master/Deposit/Slip";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
// import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { DatePicker, Pagination } from "rsuite";
import { AdminRole, clientColor, Status } from "../../../constant/constant";
import Loader from "../Loader/Loader";
import DefaultDateButton from "../../../pages/Report/DefaultDateButton";
import EditDepositFromBank from "../../modal/Master/Deposit/EditDepositFromBank";

const Deposit = ({
  data,
  title,
  time,
  setActivePage,
  meta,
  activePage,
  isLoading,
  isSuccess,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setBranchId,
  branches,
  refetch,
}) => {
  const {
    setEditPendingDeposit,
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const [editDepositFromBankId, setEditDepositFromBankId] = useState(null);
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  const status = data?.[0]?.status;

  return (
    <div className="card">
      {editDepositFromBankId && (
        <EditDepositFromBank
          editDepositFromBankId={editDepositFromBankId}
          setEditDepositFromBankId={setEditDepositFromBankId}
          refetch={refetch}
        />
      )}
      {showImage && <Slip setShowImage={setShowImage} image={image} />}

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
          <h5>{title}</h5>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
            {(adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master) && (
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
          <DefaultDateButton
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            lastThreeMonth={true}
            lastSixMonth={true}
            lastOneYear={true}
          />
        </div>

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

      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>User Id</th>
              {/* <th>Login Name</th> */}
              {adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ? (
                <th>Branch Name</th>
              ) : null}

              {/* <th>Username</th> */}
              <th>Amount</th>
              <th>UTR</th>
              <th>Slip</th>
              <th>Type</th>
              <th>Status</th>
              {(adminRole === AdminRole.punter ||
                adminRole === AdminRole.admin_staff) &&
                status === Status.APPROVED && <th>Deposited From</th>}

              <th>Remark</th>
              <th>Site</th>
              <th>Request Time</th>
              {time && <th>{time}</th>}
              {(status === Status.APPROVED || status === Status.REJECTED) && (
                <th>
                  {status === Status.APPROVED ? "Approved By" : "Rejected By"}
                </th>
              )}
              {status === Status.PENDING && adminRole === "punter" && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data?.map((item, i) => {
              return (
                <tr style={{ background: item?.bgcolor || "none" }} key={i}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setClientId(item?.userId);
                      setRefetchViewClient(true);
                      navigate(
                        `/view-client?role=${adminRole}&history=deposit`
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
                  {/* <td>{item?.loginnameVisible && item?.loginname}</td> */}
                  {adminRole === AdminRole.admin_staff ||
                  adminRole === AdminRole.hyper_master ||
                  adminRole === AdminRole.super_master ? (
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

                  <td>
                    {item?.utr}{" "}
                    {location.pathname === "/pending-deposit" && (
                      <MdOutlineContentCopy
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleCopyToClipBoard(item?.utr, setMessage)
                        }
                      />
                    )}
                  </td>
                  <td>
                    {item?.image ? (
                      <span
                        onClick={() => {
                          setShowImage(true);
                          setImage(item?.image);
                        }}
                        style={{ color: "#346cee", cursor: "pointer" }}
                      >
                        View
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{item?.type}</td>
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
                  {(adminRole === AdminRole.punter ||
                    adminRole === AdminRole.admin_staff) &&
                    item?.status === Status.APPROVED && (
                      <td>
                        {item?.depositedFrom ? (
                          <span>{item?.depositedFrom}</span>
                        ) : (
                          <div
                            onClick={() => setEditDepositFromBankId(item?.id)}
                            style={{ cursor: "pointer" }}
                            className="text-danger"
                          >
                            Add
                          </div>
                        )}
                      </td>
                    )}
                  <td>{item?.remark}</td>
                  <td>{item?.site}</td>
                  <td>{item?.date_added}</td>
                  {time && <td>{item?.date_modified}</td>}
                  {(item?.status === Status.APPROVED ||
                    item?.status === Status.REJECTED) && (
                    <td>{item?.modify_by}</td>
                  )}
                  {item?.status === Status.PENDING &&
                    adminRole === "punter" && (
                      <td>
                        <a
                          style={{
                            color: "white",
                            cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
                          }}
                          onClick={() => {
                            !readOnly && setDownLineId(item?.id);
                            !readOnly && setEditPendingDeposit(true);
                          }}
                          className="btn btn-icon btn-sm btn-success"
                        >
                          <i className="bx bxs-edit"></i>
                        </a>
                      </td>
                    )}
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
              No {title === "Completed Deposit" ? "completed" : "rejected"}{" "}
              deposit.
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

export default Deposit;
