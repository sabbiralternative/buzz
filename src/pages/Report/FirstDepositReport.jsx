import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowImage from "../../components/modal/ShowImage";
import { AdminRole } from "../../constant/constant";
import { defaultDate } from "../../utils/defaultDate";
import { DatePicker } from "rsuite";
import DefaultDateButton from "./DefaultDateButton";
import { useGetIndex } from "../../hooks";
import moment from "moment";
import Loader from "../../components/ui/Loader/Loader";

const FirstDepositReport = () => {
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });
  const [showFTDImage, setShowFTDImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [viewFRDData, setViewFTDData] = useState(false);
  const [FTDData, setFTDData] = useState([]);
  // const [totalFTD, setTotalFTD] = useState(null);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);

  const getFTDReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getFTD",
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
    setIsLoadingExport(true);
    const data = await getFTDReport();
    setIsLoadingExport(false);
    if (data?.success) {
      if (data?.result?.length > 0) {
        let firstDepositReports = data?.result;
        if (adminRole === "punter") {
          firstDepositReports = data?.result.map(
            // eslint-disable-next-line no-unused-vars
            ({ loginname, mobile, ...rest }) => rest
          );
        }
        const ws = utils.json_to_sheet(firstDepositReports);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "ftd_data.xlsx");
      }
    }
  };

  const handleToggleViewFTD = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await getFTDReport();
    setViewFTDData(true);
    setIsLoading(false);
    if (data?.success) {
      setFTDData(data?.result);
    }
  };

  let totalFTD = 0;
  for (let data of FTDData) {
    totalFTD += parseFloat(data?.amount);
  }
  // useEffect(() => {
  //   if (FTDData?.length > 0) {
  //     let totalFTD = 0;
  //     for (let data of FTDData) {
  //       totalFTD += parseFloat(data?.amount);
  //     }
  //     setTotalFTD(totalFTD?.toFixed(2));
  //   }
  // }, [FTDData]);

  return (
    <>
      {showFTDImage && (
        <ShowImage image={image} setShowImage={setShowFTDImage} />
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
                    lastSixMonth={true}
                    lastOneYear={true}
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
                  <button
                    disabled={isLoading || isLoadingExport}
                    onClick={handleToggleViewFTD}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                  >
                    {isLoading && <Loader size={15} />}{" "}
                    <span style={{ marginLeft: isLoading ? "8px" : "0px" }}>
                      View
                    </span>
                  </button>
                  <button
                    disabled={isLoading || isLoadingExport}
                    onClick={exportToExcel}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px" }}
                  >
                    {isLoadingExport && <Loader size={15} />}{" "}
                    <span
                      style={{ marginLeft: isLoadingExport ? "8px" : "0px" }}
                    >
                      Export
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {viewFRDData && (
          <>
            <hr className="my-3" />
            {totalFTD && FTDData?.length > 0 ? (
              <span> Total FRD : {totalFTD}</span>
            ) : null}
            {FTDData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">FRD Report</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>User Id</th>
                        <th>Login Name</th>
                        {adminRole === AdminRole.hyper_master ||
                        adminRole === AdminRole.admin_master ? (
                          <>
                            {/* <th>User Name</th> */}
                            <th>Mobile</th>
                          </>
                        ) : null}

                        <th>Amount</th>
                        <th>FRD Date</th>
                        <th>Image</th>
                        <th>Remark</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {FTDData?.map((data, i) => {
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
                            {adminRole === AdminRole.hyper_master ||
                            adminRole === AdminRole.admin_master ? (
                              <>
                                {/* <td>{data?.loginname}</td> */}
                                <td>{data?.mobile}</td>
                              </>
                            ) : null}
                            <td>{data?.amount}</td>
                            <td>{data?.withdraw_date}</td>
                            <td>
                              {data?.image && (
                                <img
                                  onClick={() => {
                                    setImage("");
                                    setShowFTDImage(true);
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

export default FirstDepositReport;
