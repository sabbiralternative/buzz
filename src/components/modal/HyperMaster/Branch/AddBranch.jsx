import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import axios from "axios";
import { API } from "../../../../api";
import toast from "react-hot-toast";
import handleRandomToken from "../../../../utils/handleRandomToken";
import { useForm } from "react-hook-form";
import useContextState from "../../../../hooks/useContextState";
import useGetAllBranch from "../../../../hooks/HyperMaster/Branch/useGetAllBranch";

const AddBranch = ({ setShowAddBranch }) => {
  const [disabled, setDisabled] = useState(false);
  /* close modal click outside */
  const addBranchRef = useRef();
  useCloseModalClickOutside(addBranchRef, () => {
    setShowAddBranch(false);
  });
  const { refetchAllBranch } = useGetAllBranch({ branch_type: "branch" });

  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();

  /* add branch submit */
  const onSubmit = async ({ username, password, notes }) => {
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
      username,
      password,
      notes,
      token: generatedToken,
      branch_type: "branch",
    };
    const res = await axios.post(API.addBranch, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchAllBranch();
      toast.success("Branch created successfully");
      reset();
      setShowAddBranch(false);
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
          <div className="modal-content" ref={addBranchRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Add Branch
              </h5>
              <button
                onClick={() => setShowAddBranch(false)}
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
                      Username
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("username", {
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
                      Branch Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        {...register("notes", {
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
                  onClick={() => setShowAddBranch(false)}
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

export default AddBranch;
