import axios from "axios";
import { API } from "../../api";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import useContextState from "../../hooks/useContextState";
import handleRandomToken from "../../utils/handleRandomToken";
import toast from "react-hot-toast";
import useRefetchClient from "../../hooks/Master/Client/useRefetchClient";

const ChangePassword = ({
  setShowChangePassword,
  downlineId,
  role,
  id,
  refetchAllBranch,
}) => {
  const [disabled, setDisabled] = useState(false);
  const { refetchClient } = useRefetchClient(downlineId);

  /* close modal click outside */
  const changePasswordRef = useRef();
  useCloseModalClickOutside(changePasswordRef, () => {
    setShowChangePassword(false);
  });

  const { register, handleSubmit, reset } = useForm();
  const { token, adminRole } = useContextState();
  /* handle change password */
  const onSubmit = async ({ password, confirmPassword, mpassword }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    // if (password !== confirmPassword) {
    //   return toast.error("Password did not matched");
    // }
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    const payload = {
      role,
      id,
      downlineId,
      type: "password",
      password,
      confirmPassword,
      mpassword,
      token: generatedToken,
    };

    const res = await axios.post(API.downLineEdit, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;

    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      if (adminRole === "hyper_master") {
        refetchAllBranch();
      } else {
        refetchClient();
      }
      setShowChangePassword(false);
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
          <div className="modal-content" ref={changePasswordRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Change Password
              </h5>
              <button
                onClick={() => setShowChangePassword(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="nameWithTitle" className="form-label">
                      New Password
                    </label>
                    <input
                      {...register("password", {
                        required: true,
                      })}
                      type="password"
                      id="nameWithTitle"
                      className="form-control"
                      placeholder="Enter New Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="nameWithTitle" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      type="password"
                      id="nameWithTitle"
                      className="form-control"
                      placeholder="Enter Confirm Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="nameWithTitle" className="form-label">
                      Transaction Code
                    </label>
                    <input
                      {...register("mpassword", {
                        required: true,
                      })}
                      type="text"
                      id="nameWithTitle"
                      className="form-control"
                      placeholder="Enter Transaction Code"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
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
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
