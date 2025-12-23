import { DatePicker } from "rsuite";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowImage from "../../components/modal/ShowImage";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import DefaultDateButton from "./DefaultDateButton";
import { AdminRole } from "../../constant/constant";
import { useGetIndex } from "../../hooks";

const WithdrawReport = () => {
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [viewWithdrawData, setViewWithdrawData] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  // const [totalWithdraw, setTotalWithdraw] = useState(null);

  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const getWithdrawReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getWithdraw",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      token: generatedToken,
      pagination: true,
      amountFrom: amountFrom ? Number(amountFrom) : null,
      amountTo: amountTo ? Number(amountTo) : null,
    };
    if (adminRole === AdminRole.admin_staff) {
      payload.branch_id = branchId;
    }

    const res = await axios.post(API.export, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const exportToExcel = async (e) => {
    e.preventDefault();
    const data = await getWithdrawReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        let report = data?.result;
        if (adminRole === "punter") {
          // eslint-disable-next-line no-unused-vars
          report = data?.result.map(({ loginname, mobile, ...rest }) => rest);
        }

        const ws = utils.json_to_sheet(report);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "withdraw_data.xlsx");
      }
    }
  };

  const handleToggleViewWithdraw = async (e) => {
    e.preventDefault();
    const data = await getWithdrawReport();
    setViewWithdrawData(true);
    if (data?.success) {
      setWithdrawData(data?.result);
    }
  };
  let totalWithdraw = 0;
  for (let data of withdrawData) {
    totalWithdraw += parseFloat(data?.amount);
  }
  // useEffect(() => {
  //   if (withdrawData?.length > 0) {
  //     let totalWithdraw = 0;
  //     for (let data of withdrawData) {
  //       totalWithdraw += parseFloat(data?.amount);
  //     }
  //     setTotalWithdraw(totalWithdraw?.toFixed(2));
  //   }
  // }, [withdrawData]);

  return (
    <>
      {showImage && <ShowImage image={image} setShowImage={setShowImage} />}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                id="formValidationExamples"
                className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              >
                <div className="col-md-6 col-12 mb-4">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ width: "100%" }}>
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
                    <div style={{ width: "100%" }}>
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
                  </div>
                  <DefaultDateButton
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                    lastThreeMonth={true}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    {adminRole === AdminRole.admin_staff && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <label className="col-form-label" htmlFor="Amount From">
                          Branch
                        </label>
                        <select
                          style={{ width: "200px" }}
                          defaultValue="0"
                          onChange={(e) => setBranchId(e.target.value)}
                          className="form-control"
                        >
                          <option disabled value="">
                            Branch
                          </option>
                          <option value="0">All Branch</option>
                          {branches?.result?.map((site) => (
                            <option
                              key={site?.branch_id}
                              value={site?.branch_id}
                            >
                              {site?.branch_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <label className="col-form-label" htmlFor="Amount From">
                        Amount From
                      </label>
                      <input
                        onChange={(e) => setAmountFrom(e.target.value)}
                        type="number"
                        className="form-control"
                        id="Amount From"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <label className="col-form-label" htmlFor="Amount To">
                        Amount To
                      </label>
                      <input
                        onChange={(e) => setAmountTo(e.target.value)}
                        type="number"
                        className="form-control"
                        id="Amount To"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <input
                    onClick={handleToggleViewWithdraw}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="View"
                  />
                  <input
                    style={{ marginLeft: "10px" }}
                    onClick={exportToExcel}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="Export"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {viewWithdrawData && (
          <>
            <hr className="my-3" />
            {totalWithdraw ? (
              <p style={{ margin: "0px" }}>
                Total Withdraw :
                {new Intl.NumberFormat("en-IN").format(totalWithdraw)}
              </p>
            ) : null}
            {withdrawData?.length > 0 ? (
              <p style={{ margin: "0px", marginBottom: "5px" }}>
                Withdraw Count: {withdrawData?.length}
              </p>
            ) : null}
            {withdrawData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">Withdraw Report</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>User Id</th>
                        <th>Login Name</th>
                        <th>Branch Name</th>

                        {adminRole === AdminRole.hyper_master ||
                        adminRole === AdminRole.admin_master ? (
                          <>
                            <th>Mobile</th>
                            {/* <th>User Name</th> */}
                          </>
                        ) : null}

                        <th>Bank A/C</th>
                        <th>Amount</th>
                        <th>Bank Name</th>
                        <th>Image</th>
                        <th>Request Time</th>
                        <th>Approval Time</th>
                        <th>Account No</th>
                        <th>Ifsc</th>
                        <th>Remark</th>
                        <th>Status</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {withdrawData?.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setClientId(data?.userId);
                                setRefetchViewClient(true);
                                navigate("/view-client");
                              }}
                            >
                              {data?.userId}
                            </td>
                            <td>{data?.loginname}</td>
                            <td>{data?.branch_name}</td>
                            {adminRole === AdminRole.hyper_master ||
                            adminRole === AdminRole.admin_master ? (
                              <>
                                <td>{data?.mobile}</td>
                                {/* <td>{data?.loginname}</td> */}
                              </>
                            ) : null}
                            <td>{data?.bank_account_name}</td>
                            <td>{data?.amount}</td>
                            <td>{data?.bank_name}</td>
                            <td>
                              {data?.image && (
                                <img
                                  onClick={() => {
                                    setImage("");
                                    setShowImage(true);
                                    setImage(data?.image);
                                  }}
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    objectFit: "contain",
                                  }}
                                  src={data?.image}
                                  alt=""
                                />
                              )}
                            </td>

                            <td>{data?.withdraw_date}</td>
                            <td>{data?.date_modified}</td>
                            <td>{data?.account_number}</td>
                            <td>{data?.ifsc}</td>
                            <td>{data?.remark}</td>
                            <td>
                              <span
                                className={`badge ${
                                  data?.status == "APPROVED"
                                    ? "bg-label-primary"
                                    : "bg-label-warning"
                                } me-1`}
                              >
                                {data?.status}
                              </span>
                            </td>
                            {/* <td>
                            <a
                              style={{ color: "white" }}
                              className="btn btn-icon btn-sm btn-success"
                            >
                              <i className="bx bxs-edit"></i>
                            </a>
                            &nbsp;
                            <a
                              style={{ color: "white" }}
                              className="btn btn-icon btn-sm btn-danger"
                            >
                              <i className="bx bxs-checkbox-minus"></i>
                            </a>
                          </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card">
                <h5 style={{ fontSize: "18px" }} className="card-header">
                  No data found for given date range.
                </h5>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WithdrawReport;
