import axios from "axios";
import { API } from "../../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";
import { useForm } from "react-hook-form";
import useContextState from "../../../hooks/useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useState } from "react";

const AddUPI = () => {
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

  /* add upi */
  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "addPayment",
      ...values,
      method: "upi",
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
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add New UPI
      </h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="upi_id">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    UPI ID
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("upi_id", {
                        required: true,
                      })}
                      type="text"
                      className="form-control"
                      id="basic-default-company"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="upi_account_name">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    UPI Account Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("upi_account_name", {
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
                    Minimum Deposit Amount
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
                    Maximum Deposit Amount
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

export default AddUPI;
