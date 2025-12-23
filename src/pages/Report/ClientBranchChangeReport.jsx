import moment from "moment/moment";
import { DatePicker, Pagination } from "rsuite";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultDate } from "../../utils/defaultDate";
import DefaultDateButton from "./DefaultDateButton";

const ClientBranchChangeReport = () => {
  const [refetch, setRefetch] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const [viewClientData, setViewClientData] = useState(false);
  const [clientData, setClientData] = useState([]);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const getClientBranchTargetReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "getClientTransfer",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      token: generatedToken,
      pagination: true,
      page: activePage,
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
    const data = await getClientBranchTargetReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        let clientReport = data?.result;
        if (adminRole === "punter") {
          clientReport = data?.result.map(
            // eslint-disable-next-line no-unused-vars
            ({ loginname, mobile, ...rest }) => rest
          );
        }
        const ws = utils.json_to_sheet(clientReport);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "customers_data.xlsx");
      }
    }
  };

  const handleToggleViewClient = async () => {
    const data = await getClientBranchTargetReport();
    setClientData(data);
    setViewClientData(true);
  };

  useEffect(() => {
    if (refetch) {
      handleToggleViewClient();
      setRefetch(false);
    }
  }, [activePage, refetch]);

  const meta = clientData?.pagination;

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
                />
              </div>

              <div className="col-12">
                <input
                  onClick={handleToggleViewClient}
                  type="button"
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

      {viewClientData && (
        <>
          <hr className="my-3" />
          {clientData?.result?.length > 0 && (
            <span>Number of clients : {meta?.totalRecords}</span>
          )}

          {clientData?.result?.length > 0 ? (
            <div className="card">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5>Client Branch Change Report</h5>
                <Pagination
                  onClick={() => setRefetch(true)}
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
                      <th>Old Branch</th>
                      <th>New Branch</th>
                      <th>Transfer Date</th>
                      <th>Credit Limit</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0">
                    {clientData?.result?.map((data, i) => {
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
                          <td>{data?.oldBranch}</td>
                          <td>{data?.newBranch}</td>
                          <td>{data?.transferDate}</td>
                          <td>{data?.creditLimit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                      onClick={() => setRefetch(true)}
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

export default ClientBranchChangeReport;
