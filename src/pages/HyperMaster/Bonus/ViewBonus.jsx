import useContextState from "../../../hooks/useContextState";
import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import useGetViewBonus from "../../../hooks/HyperMaster/Bonus/useViewBonus";
import { useState } from "react";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";
import toast from "react-hot-toast";
import UpdateBonus from "../../../components/modal/HyperMaster/Bonus/UpdateBonus";
import Swal from "sweetalert2";
import { AdminRole } from "../../../constant/constant";

const ViewBonus = () => {
  const [editBonusId, setEditBonusId] = useState("");
  const { bonus, refetchBonus } = useGetViewBonus();
  const { token, adminRole } = useContextState();

  const handleDeleteBonus = async (bonus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${bonus?.bonus_name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const generatedToken = handleRandomToken();
        const payload = {
          type: "deleteBonus",
          bonus_id: bonus?.bonus_id,
          token: generatedToken,
        };
        const res = await axios.post(API.bonus, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.success) {
          refetchBonus();
          toast.success("Bonus deleted successfully");
        } else {
          toast.error(data?.error?.description);
        }
      }
    });
  };

  return (
    <>
      {editBonusId && (
        <UpdateBonus
          editBonusId={editBonusId}
          setEditBonusId={setEditBonusId}
          refetchBonus={refetchBonus}
        />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Bonus</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Bonus Name</th>
                  <th>Bonus Amount</th>
                  {adminRole === AdminRole.hyper_master && (
                    <th>Number Of Usage</th>
                  )}

                  <th>Max Bonus Amount</th>
                  <th>Wagering Multiplier</th>
                  <th>Min. Deposit</th>
                  <th>Bonus Expiry</th>

                  <th>Bonus Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {bonus?.map((bonus, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <strong>
                          {handleSplitUserName(bonus?.bonus_name)}
                        </strong>
                      </td>
                      <td>
                        {bonus?.bonus_amount_type === "percentage"
                          ? `${bonus?.bonus_amount}%`
                          : `Rs. ${bonus?.bonus_amount}`}
                      </td>
                      {adminRole === AdminRole.hyper_master && (
                        <td>{bonus?.no_of_use}</td>
                      )}
                      <td>{bonus?.bonus_max_amount}</td>

                      <td>{bonus?.wagering_multiplier}</td>
                      <td>{bonus?.minimum_deposit}</td>
                      <td>
                        {bonus?.bonus_expiry_days > 1
                          ? `${bonus?.bonus_expiry_days} days`
                          : `${bonus?.bonus_expiry_days} day`}{" "}
                      </td>

                      <td>{bonus?.bonus_type}</td>
                      <td>
                        {" "}
                        <span
                          className={`badge  me-1 ${
                            bonus?.status === 1
                              ? "bg-label-primary"
                              : "bg-label-danger"
                          }`}
                        >
                          {bonus?.status === 1 ? "active" : "inactive"}
                        </span>
                      </td>
                      <td style={{ display: "flex", color: "white" }}>
                        <a
                          onClick={() => setEditBonusId(bonus?.bonus_id)}
                          className="btn btn-icon btn-sm btn-success"
                        >
                          E
                        </a>
                        &nbsp;
                        <a
                          onClick={() => handleDeleteBonus(bonus)}
                          className="btn btn-icon btn-sm btn-danger"
                        >
                          D
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBonus;
