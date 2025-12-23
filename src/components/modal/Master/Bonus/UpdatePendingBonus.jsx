import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../../../api";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";

const UpdatePendingBonus = ({ setEditBonusId, editBonusId, refetchBonus }) => {
  const [disabled, setDisabled] = useState(false);
  const editBonusRef = useRef();
  useCloseModalClickOutside(editBonusRef, () => {
    setEditBonusId("");
  });

  const { register, handleSubmit } = useForm();
  const { token } = useContextState();

  const handleUpdateBonus = async ({ status }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "editBonusStatement",
      bonus_statement_id: editBonusId,
      status,
      token: generatedToken,
    };

    const res = await axios.post(API.bonus, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      refetchBonus();
      toast.success(data?.result);
      setEditBonusId("");
      setDisabled(false);
    } else {
      toast.error(data?.error?.description);
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" ref={editBonusRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Update Pending Bonus
              </h5>
              <button
                onClick={() => setEditBonusId("")}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(handleUpdateBonus)}>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Status *
                  </label>
                  <div className="col-sm-10">
                    <select className="form-control" {...register("status")}>
                      <option value="1">Approve</option>
                      <option value="0">Reject</option>
                    </select>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={disabled}
                      type="submit"
                      name="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePendingBonus;
