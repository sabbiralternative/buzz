import { DatePicker } from "rsuite";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
// import ShowImage from "../../components/modal/ShowImage";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import DefaultDateButton from "./DefaultDateButton";
import { AdminRole } from "../../constant/constant";
import Loader from "../../components/ui/Loader/Loader";
import { useGetIndex } from "../../hooks";

const PNLReport = () => {
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndex({
    type: "getBranches",
  });
  // const [amountFrom, setAmountFrom] = useState(null);
  // const [amountTo, setAmountTo] = useState(null);
  // const [showDepositImage, setShowDepositImage] = useState(false);
  const { token, adminRole } = useContextState();
  const [viewPNLData, setViewPNLData] = useState(false);
  const [PNLData, setPNLData] = useState([]);

  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);

  const getDepositReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getPNL",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      token: generatedToken,
      pagination: true,
      // amountFrom: amountFrom ? Number(amountFrom) : null,
      // amountTo: amountTo ? Number(amountTo) : null,
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
    const data = await getDepositReport();
    setIsLoadingExport(false);
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
    setIsLoading(true);
    const data = await getDepositReport();
    setIsLoading(false);
    setViewPNLData(true);
    if (data?.success) {
      setPNLData(data?.result);
    }
  };

  let totalPNL = 0;
  for (let data of PNLData) {
    totalPNL += parseFloat(data?.amount);
  }

  return (
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
                          <option key={site?.branch_id} value={site?.branch_id}>
                            {site?.branch_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* <div
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
                    </div> */}
                </div>
              </div>

              <div className="col-12">
                <button
                  disabled={isLoading || isLoadingExport}
                  onClick={handleToggleViewDeposit}
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
                  <span style={{ marginLeft: isLoadingExport ? "8px" : "0px" }}>
                    Export
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {viewPNLData && (
        <>
          <hr className="my-3" />
          {totalPNL ? (
            <p style={{ margin: "0px" }}>
              Total PNL :{" "}
              <span
                className={`${totalPNL > 0 ? "text-success" : "text-danger"}`}
              >
                {new Intl.NumberFormat("en-IN").format(totalPNL)}
              </span>
            </p>
          ) : null}

          {PNLData?.length > 0 ? (
            <div className="card">
              <h5 className="card-header">PNL Report</h5>
              <div className="table-responsive text-nowrap">
                <table className="table table-hover table-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Event Name</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {PNLData?.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td style={{ cursor: "pointer" }}>
                            {data?.event_name}
                          </td>

                          <td
                            className={`${
                              data?.amount > 0 ? "text-success" : "text-danger"
                            }`}
                          >
                            {data?.amount}
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
  );
};

export default PNLReport;
