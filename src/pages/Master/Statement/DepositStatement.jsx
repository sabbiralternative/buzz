import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

import Deposit from "../../../components/ui/Master/Deposit";
import { useState } from "react";
import moment from "moment";
import { DatePicker } from "rsuite";

const DepositStatement = () => {
  const thirtyDayBefore = new Date(
    new Date().setDate(new Date().getDate() - 30)
  );
  const [startDate, setStartDate] = useState(thirtyDayBefore);
  const [endDate, setEndDate] = useState(new Date());
  const payload = {
    type: "viewUTR",
    status: "APPROVED",
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
  };
  const {
    allUTRs: depositStatements,
    refetchAllUTRs: refetchDepositStatements,
  } = useGetALLDeposit(payload);

  const handleGetDepositStatements = async (e) => {
    e.preventDefault();
    refetchDepositStatements();
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={handleGetDepositStatements}
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
                      defaultValue={thirtyDayBefore}
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
                      defaultValue={new Date()}
                      block
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div className="col-12">
        <Deposit data={depositStatements} title="Completed Deposit" />
      </div>
    </div>
  );
};

export default DepositStatement;
