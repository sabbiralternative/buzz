import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddClient } from "../../../hooks/addClient";
import { useOTP } from "../../../hooks/otp";
import { useEffect, useState } from "react";

const AddClient = () => {
  const [timer, setTimer] = useState(0);
  const { mutate: getOTP } = useOTP();
  const { mutate: addClient, isPending } = useAddClient();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = async (values) => {
    if (values?.password !== values?.confirmPassword) {
      return toast.error("Password not matched");
    }
    const payload = {
      mobile: values?.mobile,
      otp: values?.otp,
      username: values?.username,
      password: values?.password,
    };
    addClient(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success("Client added successfully");
          reset();
          navigate("/view-client");
        } else {
          toast.error(data?.error?.description);
        }
      },
    });
  };

  const mobile = watch("mobile");
  const otp = watch("otp");
  const username = watch("username");

  const isMobileOTPFilled = mobile?.trim() !== "" && otp?.trim() !== "";
  const isUserNameFilled = username?.trim() !== "";

  const handleGetOTP = async () => {
    getOTP(
      { mobile },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setTimer(60);
            toast.success(data?.result?.message);
          } else {
            toast.error(data?.error?.errorMessage);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (timer <= 0) return;

    const id = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [timer]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Client
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Phone Number *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="number"
                      {...register("mobile")}
                      className="form-control"
                      id="basic-default-name"
                    />
                    {timer > 0 ? (
                      <button
                        type="button"
                        style={{
                          position: "absolute",
                          top: "7px",
                          right: "20px",
                          cursor: "auto",
                        }}
                        className="btn btn-primary btn-xs"
                      >
                        Retry in {timer}s
                      </button>
                    ) : (
                      <button
                        disabled={mobile?.length < 10}
                        onClick={handleGetOTP}
                        type="button"
                        style={{
                          position: "absolute",
                          top: "7px",
                          right: "40px",
                        }}
                        className="btn btn-primary btn-xs"
                      >
                        Get OTP Message
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Enter OTP *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("otp")}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0px",
                    gap: "0px 10px",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      background: "#546990",
                      width: "100%",
                    }}
                  />
                  <span style={{ fontWeight: "bold" }}>Or</span>
                  <div
                    style={{
                      height: "1px",
                      background: "#546990",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Username *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("username")}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Confirm Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={
                        isPending || (!isMobileOTPFilled && !isUserNameFilled)
                      }
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

export default AddClient;
