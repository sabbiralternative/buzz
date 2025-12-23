import { useEffect, useState } from "react";
import { AdminRole } from "../../constant/constant";
import { useGetIndex } from "../../hooks";
import useBalance from "../../hooks/useBalance";
import useContextState from "../../hooks/useContextState";
import DashboardDW from "./DashboardDW";
import { jwtDecode } from "jwt-decode";
import Loader from "../../components/ui/Loader/Loader";
import { DatePicker } from "rsuite";
import moment from "moment";
import { useUser } from "../../hooks/use-user";

const Home = () => {
  const today = new Date();
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const [depositPermission, setDepositPermission] = useState(false);
  const [withdrawPermission, setWithdrawPermission] = useState(false);
  const { data } = useGetIndex({ type: "getDashboardDW" });
  const { adminRole, token } = useContextState();
  const { balanceData, isLoading, isPending } = useBalance({
    date: moment(date).format("YYYY-MM-DD"),
    user_id: user?.user_id,
    role: user?.role,
  });
  const defineBalanceColor = (amount) => {
    if (amount) {
      const parseAmount = parseFloat(amount);
      if (parseAmount === 0) {
        return "white";
      } else if (parseAmount > 0) {
        return "#39da8a";
      } else {
        return "#ff5b5c";
      }
    }
  };
  const deposit = data?.result?.deposit;
  const withdraw = data?.result?.withdraw;

  useEffect(() => {
    if (adminRole) {
      if (adminRole === AdminRole.admin_staff) {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;
        const depositPermission = permissions?.includes("deposit") ?? false;
        const withdrawPermission = permissions?.includes("withdraw") ?? false;
        setDepositPermission(depositPermission);
        setWithdrawPermission(withdrawPermission);
      }
      if (adminRole === AdminRole.hyper_master) {
        setDepositPermission(true);
        setWithdrawPermission(true);
      }
    }
  }, [adminRole, token]);

  const disableOutsideLast14Days = (date) => {
    const start = new Date();
    start.setDate(today.getDate() - 14);

    return date < start || date > today;
  };

  console.log(balanceData);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div style={{ marginBottom: "10px" }}>
        <DatePicker
          style={{ width: "100%", maxWidth: "300px" }}
          format="dd-MM-yyyy"
          editable={false}
          value={date}
          onChange={setDate}
          disabledDate={disableOutsideLast14Days}
          block
        />
      </div>
      {adminRole &&
        adminRole !== "admin_staff" &&
        adminRole !== "branch_staff" && (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="row">
                {balanceData?.map((item, idx) => {
                  return (
                    <div key={idx} className="col-sm-3 col-12 mb-4">
                      <a>
                        <div className="card">
                          <div className="card-body text-center">
                            <h2
                              className="mb-1"
                              style={{
                                color: `${defineBalanceColor(item?.value)}`,
                              }}
                            >
                              {isLoading || isPending ? (
                                <Loader />
                              ) : (
                                item?.value
                              )}
                            </h2>
                            <span className="text-muted">{item?.title}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      {adminRole === AdminRole.hyper_master ||
      adminRole === AdminRole.admin_staff ? (
        <div className="d-lg-flex" style={{ gap: "10px" }}>
          {depositPermission && (
            <DashboardDW
              data={deposit}
              title="Pending Deposit"
              emptyMessage="No pending deposit"
            />
          )}
          {withdrawPermission && (
            <DashboardDW
              data={withdraw}
              title="Pending Withdraw"
              emptyMessage="No pending withdraw"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
