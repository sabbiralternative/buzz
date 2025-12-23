import moment from "moment";
import { useState } from "react";
import UpdatePendingBonus from "../../modal/Master/Bonus/UpdatePendingBonus";
import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";

const Bonus = ({ data, title, refetchBonus }) => {
  const { setClientId, setRefetchViewClient, adminRole } = useContextState();
  const navigate = useNavigate();
  const [editBonusId, setEditBonusId] = useState("");
  const formateDate = (date) => {
    if (date) {
      const formateDate = moment(date).format("DD-MM-YYYY, h:mm a");
      return formateDate;
    }
  };
  return (
    <>
      {editBonusId && (
        <UpdatePendingBonus
          editBonusId={editBonusId}
          setEditBonusId={setEditBonusId}
          refetchBonus={refetchBonus}
        />
      )}
      {data?.length > 0 && (
        <div className="card">
          <h5 className="card-header">{title} Bonus</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark bonus-table">
                <tr>
                  <th>User Id</th>
                  <th>Bonus Amount</th>
                  <th>Wagering Amount</th>
                  <th>Wagering Completed</th>
                  <th>Wagering Status</th>
                  <th>Claim Status</th>
                  <th>Issue Date</th>
                  <th>Expiry Date</th>
                  {title === "Pending" && <th>Action</th>}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {data?.map((bonus, i) => {
                  return (
                    <tr key={i} className="bonus-table">
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setClientId(bonus?.user_id);
                          setRefetchViewClient(true);
                          navigate("/view-client");
                        }}
                      >
                        {bonus?.user_id}
                      </td>
                      <td>₹{bonus?.bonus_amount}</td>
                      <td style={{ cursor: "pointer" }}>
                        ₹{bonus?.wagering_amount}
                      </td>
                      <td>₹{bonus?.wagering_complete_amount}</td>
                      <td
                        style={{
                          color:
                            bonus?.is_wagering_complete === "Complete"
                              ? "#39da8a"
                              : "red",
                        }}
                      >
                        {bonus?.is_wagering_complete}{" "}
                      </td>
                      <td
                        style={{
                          color:
                            bonus?.is_claimed === "Complete"
                              ? "#39da8a"
                              : bonus?.is_claimed === "Pending"
                              ? "orange"
                              : "red",
                        }}
                      >
                        {bonus?.is_claimed}
                      </td>
                      <td>{formateDate(bonus?.date_added)}</td>
                      <td>{formateDate(bonus?.expiry_date)}</td>
                      {title === "Pending" && adminRole === "punter" && (
                        <td style={{ color: "white" }}>
                          <a
                            onClick={() =>
                              setEditBonusId(bonus?.bonus_statement_id)
                            }
                            className="btn btn-icon btn-sm btn-success"
                          >
                            E
                          </a>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data?.length === 0 && (
        <div className="card">
          <h5 style={{ fontSize: "18px" }} className="card-header">
            No bonus statement found.
          </h5>
        </div>
      )}
    </>
  );
};

export default Bonus;
