import { useState } from "react";
import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";
import { defaultDate } from "../../../utils/defaultDate";
import moment from "moment";
import { useGetIndex } from "../../../hooks";
import useContextState from "../../../hooks/useContextState";
import { AdminRole } from "../../../constant/constant";

const RejectedDeposit = () => {
  const { data } = useGetIndex({
    type: "getBranches",
  });
  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewUTR",
    status: "REJECTED",
    pagination: true,
    page: activePage,
    fromDate: moment(startDate).format("YYYY-MM-DD"),
    toDate: moment(endDate).format("YYYY-MM-DD"),
  };
  if (
    adminRole === AdminRole.admin_staff ||
    adminRole === AdminRole.hyper_master
  ) {
    payload.branch_id = branchId;
  }
  const { allUTRs, isLoading, isSuccess } = useGetALLDeposit(payload);
  const meta = allUTRs?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit
        time="Rejection Time"
        data={allUTRs?.result}
        activePage={activePage}
        meta={meta}
        setActivePage={setActivePage}
        title="Rejected Deposit"
        isLoading={isLoading}
        isSuccess={isSuccess}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        branches={data}
        setBranchId={setBranchId}
      />
    </div>
  );
};

export default RejectedDeposit;
