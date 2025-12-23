import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import { useGetIndex } from "../../../hooks";
import useContextState from "../../../hooks/useContextState";
import { AdminRole } from "../../../constant/constant";
import { defaultDate } from "../../../utils/defaultDate";
import moment from "moment";

const RejectedWithdraw = () => {
  const { data } = useGetIndex({
    type: "getBranches",
  });
  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewWithdraw",
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
  const { allWithdraw, isLoading, isSuccess, refetchAllWithdraw } =
    useGetALLWithdraw(payload);
  const meta = allWithdraw?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        time="Rejection Time"
        data={allWithdraw?.result}
        activePage={activePage}
        meta={meta}
        setActivePage={setActivePage}
        title="Rejected Withdraw"
        isLoading={isLoading}
        isSuccess={isSuccess}
        refetchAllWithdraw={refetchAllWithdraw}
        branches={data}
        endDate={endDate}
        setBranchId={setBranchId}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
      />
    </div>
  );
};

export default RejectedWithdraw;
