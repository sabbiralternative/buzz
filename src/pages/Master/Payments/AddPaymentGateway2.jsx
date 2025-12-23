import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";
import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";

const AddPaymentGateway2 = ({ setAddPaymentGateway }) => {
  const [disabled, setDisabled] = useState(false);
  const payload = {
    type: "viewPaymentMethods",
  };
  const navigate = useNavigate();
  const { refetchPaymentMethods } = useGetPaymentMethod(payload);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { token } = useContextState();
  const addPaymentGateway = useRef();
  useCloseModalClickOutside(addPaymentGateway, () => {
    setAddPaymentGateway(false);
  });

  /* add upi */
  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "addPayment",
      ...values,
      method: "upigateway2",
      token: generatedToken,
    };
    const res = await axios.post(API.payments, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchPaymentMethods();
      toast.success(data?.result?.message);
      reset();
      navigate("/view-payment-method");
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Payment Gateway
        2
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="row mb-3" id="bank_account_name_div">
                    <div
                      className="col-sm-12"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Webhook URL
                      </label>
                      <p style={{ margin: "0px" }}>
                        https://api7.live/api/payment_gateway/upigateway/callback
                      </p>

                      <a
                        title="Copy Link"
                        style={{
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleCopy(
                            "https://api7.live/api/payment_gateway/upigateway/callback"
                          );
                        }}
                        className="btn btn-icon btn-primary btn-sm"
                      >
                        <FaRegCopy size={15} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("title", {
                        required: true,
                      })}
                      type="text"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    API Key
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("api_key", {
                        required: true,
                      })}
                      type="text"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Minimum Deposit
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("min_amount", {
                        required: true,
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Maximum Deposit
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("max_amount", {
                        required: true,
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Sort
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("sort", {
                        required: true,
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Transaction Code
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("transaction_code", {
                        required: "Transaction code is required",
                      })}
                      type="number"
                      className="form-control"
                      id="basic-default-company"
                    />
                    {errors.transaction_code && (
                      <p className="text-danger">
                        {errors.transaction_code.message}
                      </p>
                    )}
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
    </div>
  );
};

export default AddPaymentGateway2;
