import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminRole } from "../../constant/constant";
import { defaultDate } from "../../utils/defaultDate";
import { DatePicker } from "rsuite";
import DefaultDateButton from "./DefaultDateButton";
import moment from "moment";
import Loader from "../../components/ui/Loader/Loader";

const LastDepositReport = () => {
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [showViewReport, setShowViewReport] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);

  const getFTDReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getLDT",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      token: generatedToken,
      pagination: true,
    };

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

  const handleViewReport = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await getFTDReport();
    setShowViewReport(true);
    setIsLoading(false);
    if (data?.success) {
      setReportData(data?.result);
    }
  };

  return (
    <>
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
                    lastTwoYear
                    lastThreeYear
                  />
                </div>

                <div className="col-12">
                  <button
                    disabled={isLoading || isLoadingExport}
                    onClick={handleViewReport}
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

        {showViewReport && (
          <>
            <hr className="my-3" />

            {reportData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">LDT Report</h5>
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

                        <th>Last Deposit Date</th>
                        <th>Day Since Last Deposit</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {reportData?.map((data, i) => {
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
                            <td>{data?.last_deposit_date}</td>
                            <td>{data?.days_since_last_deposit}</td>
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

export default LastDepositReport;
