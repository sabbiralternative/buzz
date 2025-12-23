import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import handleRandomToken from "../../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import useContextState from "../../../../hooks/useContextState";
import useGetSingleDeposit from "../../../../hooks/Master/Deposit/useGetSingleDeposit";

const EditPendingDeposit = ({ setEditPendingDeposit, refetchAllUTRs }) => {
  const [disabled, setDisabled] = useState(false);
  const editDepositRef = useRef();
  useCloseModalClickOutside(editDepositRef, () => {
    setEditPendingDeposit(false);
  });
  const { register, handleSubmit, reset } = useForm();
  const { token, downLineId } = useContextState();
  const payload = {
    type: "viewSingleUTR",
    depositId: downLineId,
  };

  const { singleDeposit } = useGetSingleDeposit(payload);
  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      ...values,
      depositId: downLineId,
      type: "editUTR",
      token: generatedToken,
    };
    const res = await axios.post(API.utr, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;

    if (data?.success) {
      setDisabled(false);
      refetchAllUTRs();
      toast.success(data?.result?.message);
      reset();
      setEditPendingDeposit(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
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
          <div className="modal-content" ref={editDepositRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Deposit
              </h5>
              <button
                onClick={() => setEditPendingDeposit(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    {/*   <div className="row mb-3" id="bank_account_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Username
                      </label>
                      <div className="col-sm-10">
                        {" "}
                        {singleDeposit?.loginname}
                      </div>
                    </div> */}
                    <div className="row mb-3">
                      <label
                        htmlFor="exampleFormControlSelect1"
                        className="col-sm-2 col-form-label"
                      >
                        Amount
                      </label>
                      <div className="col-sm-9" data-select2-id="26">
                        <div className="position-relative" data-select2-id="25">
                          {singleDeposit?.amount}
                        </div>
                      </div>
                    </div>

                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Status
                    </label>
                    <div className="col-sm-10">
                      <select
                        {...register("status", {
                          value: singleDeposit?.status,
                          required: true,
                        })}
                        className="select2 form-select select2-hidden-accessible"
                      >
                        <option
                          selected={singleDeposit?.status === "PENDING"}
                          value="PENDING"
                        >
                          PENDING
                        </option>
                        <option
                          selected={singleDeposit?.status === "APPROVED"}
                          value="APPROVED"
                        >
                          APPROVED
                        </option>
                        <option
                          selected={singleDeposit?.status === "REJECTED"}
                          value="REJECTED"
                        >
                          REJECTED
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Bank Name</label>
                    <div className="col-sm-10">
                      <input
                        {...register("bank_name", {
                          value: singleDeposit?.bank_name,
                        })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Account Number
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("account_number", {
                          value: singleDeposit?.account_number,
                        })}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Remark
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("remark", {
                          value: singleDeposit?.remark,
                        })}
                        type="text"
                        name="remark"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setEditPendingDeposit(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPendingDeposit;
