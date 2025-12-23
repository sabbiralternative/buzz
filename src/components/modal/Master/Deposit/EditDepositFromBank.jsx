import { useRef } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../../../lib/AxiosSecure";

const EditDepositFromBank = ({
  editDepositFromBankId,
  setEditDepositFromBankId,
  refetch,
}) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setEditDepositFromBankId(null);
  });
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      deposit_id: editDepositFromBankId,
      type: "editUTRBank",
    };
    const res = await AxiosSecure.post(API.utr, payload);
    const data = res.data;

    if (data?.success) {
      refetch();
      toast.success(data?.result?.message);
      reset();
      setEditDepositFromBankId(null);
    } else {
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
          <div className="modal-content" ref={ref}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Deposit From Bank
              </h5>
              <button
                onClick={() => setEditDepositFromBankId(null)}
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
                      htmlFor="bank-name"
                    >
                      Bank Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("bank_name", { required: true })}
                        type="text"
                        className="form-control"
                        id="bank-name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="account-number"
                    >
                      Account Number
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("account_number", { required: true })}
                        type="text"
                        className="form-control"
                        id="account-number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setEditDepositFromBankId(null)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
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

export default EditDepositFromBank;
