import { useForm } from "react-hook-form";
import useContextState from "../../../../hooks/useContextState";
import handleRandomToken from "../../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";

const Deposit = ({
  setShowDeposit,
  downlineId,
  role,
  id,
  refetchAllBranch,
}) => {
  const [disabled, setDisabled] = useState(false);

  /* close modal click outside */
  const depositRef = useRef();
  useCloseModalClickOutside(depositRef, () => {
    setShowDeposit(false);
  });
  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();
  const onSubmit = async ({ amount, remark }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    const payload = {
      downlineId,
      type: "deposit",
      amount,
      remark,
      token: generatedToken,

      role,
      id,
    };
    const res = await axios.post(API.downLineEdit, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      refetchAllBranch();
      setShowDeposit(false);
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
          <div className="modal-content" ref={depositRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Deposit
              </h5>
              <button
                onClick={() => setShowDeposit(false)}
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
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Amount
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        {...register("amount", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-name"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_number_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Remark
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("remark", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowDeposit(false)}
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
                  Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
