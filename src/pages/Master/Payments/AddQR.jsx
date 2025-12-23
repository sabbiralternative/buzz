import { useForm } from "react-hook-form";
import handleRandomToken from "../../../utils/handleRandomToken";
import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";
import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { API } from "../../../api";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";

const AddQR = () => {
  const [disabled, setDisabled] = useState(false);
  const { token } = useContextState();
  const payload = {
    type: "viewPaymentMethods",
  };
  const [qr_code, setQr_code] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { refetchPaymentMethods } = useGetPaymentMethod(payload);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* Upload image */
  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const payload = {
          type: "payment",
        };
        formData.append("data", JSON.stringify(payload));
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setLoading(false);
        if (data?.success) {
          setQr_code(data?.filePath);
        }
      };
      handleSubmitImage();
    }
  }, [image, token]);

  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "addPayment",
      qr_code,
      ...values,
      method: "qr",
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
        <span className="text-muted fw-light">Home /</span> Add New QR
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="qr_code">
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
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
                {!loading && !qr_code && (
                  <div className="row mb-3" id="qr_code">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      QR Code
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-control"
                        type="file"
                        id="fileToUpload"
                        name="fileToUpload"
                      />
                    </div>
                  </div>
                )}
                {!loading && qr_code && (
                  <div className="row mb-3" id="qr_code">
                    <span
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      <RxCross2
                        onClick={() => setQr_code("")}
                        size={30}
                        cursor="pointer"
                      />
                    </span>
                    <div className="col-sm-10">
                      <img
                        style={{ height: "200px", objectFit: "contain" }}
                        className="form-control"
                        src={qr_code}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="row mb-3" id="qr_code">
                    <span
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      {" "}
                      QR Code
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                      className="col-sm-10"
                    >
                      <FaSpinner size={30} className="animate-spin" />
                    </div>
                  </div>
                )}

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

export default AddQR;
