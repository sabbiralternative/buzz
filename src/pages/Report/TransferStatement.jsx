import { DatePicker, Pagination } from "rsuite";
import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useEffect, useState } from "react";
import moment from "moment";
import { defaultDate } from "../../utils/defaultDate";
import DefaultDateButton from "./DefaultDateButton";

const TransferStatement = () => {
  const [activePage, setActivePage] = useState(1);
  const { token, adminRole } = useContextState();
  const [viewTransferStatementData, setViewTransferStatementData] =
    useState(false);
  const [transferStatement, setTransferStatement] = useState([]);

  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const onSubmit = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "viewTransfer",
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
      token: generatedToken,
      pagination: true,
      page: activePage,
    };

    const res = await axios.post(API.transferStatement, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const exportToExcel = async (e) => {
    e.preventDefault();
    const data = await onSubmit();
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
        writeFile(wb, "transfer_data.xlsx");
      }
    }
  };

  const handleViewTransferStatement = async (e) => {
    e.preventDefault();
    const data = await onSubmit();
    setViewTransferStatementData(true);
    if (data?.result?.length > 0) {
      setTransferStatement(data);
    }
  };
  const meta = transferStatement?.pagination;

  useEffect(() => {
    if (viewTransferStatementData) {
      const refetch = async () => {
        const data = await onSubmit();
        setViewTransferStatementData(true);

        if (data?.result?.length > 0) {
          setTransferStatement(data);
        }
      };
      refetch();
    }
  }, [activePage, viewTransferStatementData]);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
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
                {/* {adminRole !== "punter" && (
                  <div className="col-md-6 col-12 mb-4">
                    <label htmlFor="flatpickr-range" className="form-label">
                      Type
                    </label>
                    <select
                      onChange={(e) => setType(e.target.value)}
                      className="select2 form-select select2-hidden-accessible"
                    >
                      <option value="All">All</option>
                      <option value="Upline">Upline</option>
                      <option value="Downline">Downline</option>
                    </select>
                  </div>
                )} */}

                <div className="col-12">
                  <input
                    onClick={handleViewTransferStatement}
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

        {viewTransferStatementData && (
          <>
            <hr className="my-3" />

            {transferStatement?.result?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">Transfer Statement</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>Date Added</th>
                        <th>Login Name</th>
                        <th>Amount</th>
                        <th>Narration</th>
                        <th>From To</th>
                        <th>Transfer Type</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {transferStatement?.result?.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data?.date_added}</td>
                            <td
                              style={{
                                color:
                                  data?.transfer_type === "deposit"
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {data?.amount}
                            </td>
                            <td>{data?.loginname}</td>
                            <td>{data?.narration}</td>
                            <td>{data?.fromTo}</td>
                            <td>{data?.transfer_type}</td>
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
    </>
  );
};

export default TransferStatement;
