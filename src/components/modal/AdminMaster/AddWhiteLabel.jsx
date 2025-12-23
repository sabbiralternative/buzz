import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import handleRandomToken from "../../../utils/handleRandomToken";
import {
  useAddWhiteLabel,
  useWhiteLabel,
} from "../../../hooks/AdminMaster/whiteLabel";

const AddWhiteLabel = ({ setShowAddWhiteLabel }) => {
  const [disabled, setDisabled] = useState(false);
  const addWhiteLabelRef = useRef();
  useCloseModalClickOutside(addWhiteLabelRef, () => {
    setShowAddWhiteLabel(false);
  });
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addWhiteLabel } = useAddWhiteLabel();
  const { refetch } = useWhiteLabel({
    type: "viewWhitelabel",
  });

  const onSubmit = async (values) => {
    setDisabled(true);
    if (values?.password !== values?.confirm_password) {
      return toast.error("Password did not matched!");
    }
    const generatedToken = handleRandomToken();
    const payload = {
      type: "addWhitelabel",
      site_name: values?.site_name,
      site_url: values?.site_url,
      password: values?.password,
      currency: values?.currency,
      admin_name: values?.admin_name,
      casino_currency: values?.casino_currency,
      minimum_deposit: Number(values?.minimum_deposit),
      minimum_withdraw: Number(values?.minimum_withdraw),
      theme: values?.theme,
      token: generatedToken,
    };

    addWhiteLabel(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          refetch();
          toast.success(data?.result);
          reset();
          setShowAddWhiteLabel(false);
        } else {
          setDisabled(false);
          toast.error(data?.error);
        }
      },
    });
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
          <div className="modal-content" ref={addWhiteLabelRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Add white Label
              </h5>
              <button
                onClick={() => setShowAddWhiteLabel(false)}
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
                      Site Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("site_name", {
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
                      Site URL
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("site_url", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_number_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Admin Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("admin_name", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="ifsc_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("password", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="ifsc_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Confirm Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("confirm_password", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Currency
                    </label>
                    <div
                      className="col-sm-10"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "50px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <span>INR</span>
                        <input
                          type="radio"
                          {...register("currency")}
                          value="inr"
                          className=""
                          id="basic-default-name"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <span>AED</span>
                        <input
                          type="radio"
                          {...register("currency")}
                          value="aed"
                          className=""
                          id="basic-default-name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Casino Currency
                    </label>
                    <div
                      className="col-sm-10"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "50px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <span>INR</span>
                        <input
                          type="radio"
                          {...register("casino_currency")}
                          value="inr"
                          className=""
                          id="basic-default-name"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <span>AED</span>
                        <input
                          type="radio"
                          {...register("casino_currency")}
                          value="aed"
                          className=""
                          id="basic-default-name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3" id="ifsc_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Minimum Deposit
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        {...register("minimum_deposit", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="ifsc_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Minimum Withdraw
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        {...register("minimum_withdraw", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-company"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_number_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Theme
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("theme", {
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
                  onClick={() => setShowAddWhiteLabel(false)}
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWhiteLabel;
