import { DatePicker } from "rsuite";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import ShowImage from "../../components/modal/ShowImage";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import DefaultDateButton from "./DefaultDateButton";
import { AdminRole } from "../../constant/constant";
import { useGetIndex } from "../../hooks";

const DirectDepositReport = () => {
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [showDepositImage, setShowDepositImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [viewDepositData, setViewDepositData] = useState(false);
  const [depositData, setDepositData] = useState([]);
  // const [totalDeposit, setTotalDeposit] = useState(null);

  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const getDepositReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getDirectDeposit",
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
    const data = await getDepositReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        let depositReport = data?.result;
        if (adminRole === "punter") {
          depositReport = data?.result.map(
            // eslint-disable-next-line no-unused-vars
            ({ loginname, mobile, ...rest }) => rest
          );
        }
        const ws = utils.json_to_sheet(depositReport);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "deposit_data.xlsx");
      }
    }
  };

  const handleToggleViewDeposit = async (e) => {
    e.preventDefault();

    const data = await getDepositReport();

    setViewDepositData(true);
    if (data?.success) {
      setDepositData(data?.result);
    }
  };

  let totalDeposit = 0;
  for (let data of depositData) {
    totalDeposit += parseFloat(data?.amount);
  }

  // useEffect(() => {
  //   if (depositData?.length > 0) {
  //     let totalDeposit = 0;
  //     for (let data of depositData) {
  //       totalDeposit += parseFloat(data?.amount);
  //     }
  //     setTotalDeposit(totalDeposit?.toFixed(2));
  //   }
  // }, [depositData]);

  return (
    <>
      {showDepositImage && (
        <ShowImage image={image} setShowImage={setShowDepositImage} />
      )}
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
                    onClick={handleToggleViewDeposit}
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

        {viewDepositData && (
          <>
            <hr className="my-3" />
            {totalDeposit && (
              <p style={{ margin: "0px" }}>
                Total Deposit :
                {new Intl.NumberFormat("en-IN").format(totalDeposit)}
              </p>
            )}
            {depositData?.length > 0 && (
              <p style={{ margin: "0px", marginBottom: "5px" }}>
                Deposit Count: {depositData?.length}
              </p>
            )}
            {depositData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">Direct Deposit Report</h5>
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

                        <th>Amount</th>
                        <th>Utr</th>
                        <th>Request Time</th>
                        <th>Approval Time</th>
                        <th>Image</th>
                        <th>Remark</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {depositData?.map((data, i) => {
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

                            <td>{data?.amount}</td>
                            <td>{data?.utr}</td>
                            <td>{data?.deposit_date}</td>
                            <td>{data?.date_modified}</td>
                            <td>
                              {data?.image && (
                                <img
                                  onClick={() => {
                                    setImage("");
                                    setShowDepositImage(true);
                                    setImage(data?.image);
                                  }}
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    objectFit: "contain",
                                    cursor: "pointer",
                                  }}
                                  src={data?.image}
                                  alt=""
                                />
                              )}
                            </td>
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

export default DirectDepositReport;
