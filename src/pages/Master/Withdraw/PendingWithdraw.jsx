import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";
import { useGetIndex } from "../../../hooks";
import { AdminRole } from "../../../constant/constant";
import useContextState from "../../../hooks/useContextState";
import { defaultDate } from "../../../utils/defaultDate";
import moment from "moment";

const PendingWithdraw = () => {
  const [startDate, setStartDate] = useState(defaultDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const { adminRole } = useContextState();
  const [branchId, setBranchId] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const { data } = useGetIndex({
    type: "getBranches",
  });

  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    pagination: true,
    amountFrom,
    amountTo,
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

  const { allWithdraw, refetchAllWithdraw, isLoading, isSuccess } =
    useGetALLWithdraw(payload, 30000);
  const meta = allWithdraw?.pagination;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        refetchAllWithdraw={refetchAllWithdraw}
        activePage={activePage}
        setActivePage={setActivePage}
        meta={meta}
        setAmountFrom={setAmountFrom}
        setAmountTo={setAmountTo}
        amountFrom={amountFrom}
        amountTo={amountTo}
        data={allWithdraw?.result}
        title="Pending Withdraw"
        isLoading={isLoading}
        isSuccess={isSuccess}
        branchId={branchId}
        setBranchId={setBranchId}
        branches={data}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
      />
    </div>
  );
};

export default PendingWithdraw;
