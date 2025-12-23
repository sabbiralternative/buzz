import { useForm } from "react-hook-form";
import useContextState from "../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../api";
import { handleLogOut } from "../../utils/handleLogOut";
import handleRandomToken from "../../utils/handleRandomToken";
import { useState } from "react";

const ChangePasswordAfterLogin = () => {
  const [disabled, setDisabled] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { token } = useContextState();
  const navigate = useNavigate();

  /* handle change password  */
  const onSubmit = async ({ oldPassword, newPassword, confirmPassword }) => {
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
      newPassword,
      oldPassword,
      confirmPassword,
      token: generatedToken,
      changePasswordType: "after_login",
    };
    const res = await axios.post(API.changePassword, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;

    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      setTimeout(() => {
        handleLogOut();
        navigate("/login");
      }, 1000);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Change Password
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
                    Old Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      {...register("oldPassword", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowOldPassword((prev) => !prev)}
                    >
                      <i
                        className={`bx ${
                          showOldPassword ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    New Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      {...register("newPassword", {
                        required: true,
                      })}
                      type={showNewPassword ? "text" : "password"}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowNewPassword((prev) => !prev)}
                    >
                      <i
                        className={`bx ${
                          showNewPassword ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
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
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <i
                        className={`bx ${
                          showConfirmPassword ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
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

export default ChangePasswordAfterLogin;
