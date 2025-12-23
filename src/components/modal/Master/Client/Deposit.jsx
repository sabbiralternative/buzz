import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../../../api";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetPaymentMethod from "../../../../hooks/Master/Client/useGetPaymentMethod";
import useUTR from "../../../../hooks/utr";

const Deposit = ({ setClientDeposit, downlineId, role, id }) => {
  let payload = {
    type: "getActivePayments",
    id,
    role,
  };
  const [disabled, setDisabled] = useState(false);
  const { mutate: getUTR } = useUTR();
  const { paymentsMethods } = useGetPaymentMethod(payload);
  const depositRef = useRef();
  useCloseModalClickOutside(depositRef, () => {
    setClientDeposit(false);
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { token } = useContextState();
  const [filePath, setFilePath] = useState("");
  const [image, setImage] = useState(null);

  /* Upload image */
  useEffect(() => {
    if (image) {
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const payload = {
          type: "utr",
        };
        formData.append("data", JSON.stringify(payload));
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;

        if (data?.success) {
          getUTR(data?.filePath, {
            onSuccess: (data) => {
              if (data?.success) {
                reset({ utr: data?.utr });
              }
            },
          });
          setFilePath(data?.filePath);
        }
      };
      handleSubmitImage();
    }
  }, [image, token, getUTR, reset]);

  const onSubmit = async ({ amount, utr, paymentId }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      id,
      downlineId,
      paymentId,
      amount,
      slip: filePath,
      utr,
      token: generatedToken,
      role,
    };

    const res = await axios.post(API.depositClient, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      setClientDeposit(false);
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
                onClick={() => setClientDeposit(false)}
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
                      Payment
                    </label>
                    <div className="col-sm-10">
                      <select
                        {...register("paymentId", {
                          required: true,
                        })}
                        id="type"
                        name="paymentId"
                        className="select2 form-select select2-hidden-accessible"
                        data-allow-clear="true"
                        aria-hidden="true"
                      >
                        <option value="" data-select2-id="2" selected="">
                          Select
                        </option>
                        {paymentsMethods?.map((method, i) => {
                          return (
                            <option key={i} value={method?.id}>
                              {method?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Amount
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("amount", {
                          required: true,
                        })}
                        type="number"
                        className="form-control"
                        id="basic-default-name"
                        placeholder="Amount"
                      />
                    </div>
                  </div>

                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Deposit Slip
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        className="form-control"
                        id="basic-default-name"
                        placeholder="Slip"
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      UTR Code
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("utr", {
                          required: true,
                        })}
                        type="number"
                        className="form-control"
                        id="basic-default-name"
                        placeholder="UTR Code"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setClientDeposit(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    (!filePath && errors?.utr?.type === "required") || disabled
                  }
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
