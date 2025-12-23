import { useEffect, useRef, useState } from "react";
import useContextState from "../../../../hooks/useContextState";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetStatus from "../../../../hooks/HyperMaster/Branch/useGetStatus";
import handleRandomToken from "../../../../utils/handleRandomToken";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../api";

const ChangeBranch = ({
  setShowChangeBranch,
  downlineId,
  role,
  id,
  refetchClient,
}) => {
  const [disabled, setDisabled] = useState(false);
  const { token } = useContextState();
  const [activeBranchId, setActiveBranchId] = useState(null);

  const statusRef = useRef();
  useCloseModalClickOutside(statusRef, () => {
    setShowChangeBranch(false);
  });

  let payload = {
    downlineId,
    type: "viewBranches",
    id,
    role,
  };

  const { status: branches } = useGetStatus(payload);

  useEffect(() => {
    if (branches?.branch?.length > 0) {
      const findActive = branches?.branch?.find((br) => br?.active);
      setActiveBranchId(findActive?.branch_id);
    }
  }, [branches]);

  /* handle edit user lock */
  const handleChangeUserColor = async (e) => {
    setDisabled(true);
    e.preventDefault();
    const generatedToken = handleRandomToken();
    let payload = {
      id,
      downlineId,
      type: "changeBranch",
      branch_id: activeBranchId,
      token: generatedToken,
      role,
    };

    const res = await axios.post(API.downLineEdit, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      setShowChangeBranch(false);
      refetchClient();
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
          <div className="modal-content" ref={statusRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Change Branch
              </h5>
              <button
                onClick={() => setShowChangeBranch(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleChangeUserColor}>
              <div className="modal-body">
                {branches?.branch?.map(({ branch_name, branch_id }) => (
                  <div className="row" key={branch_id}>
                    <div className="col mb-3">
                      <label className="switch">
                        <input
                          onChange={() => setActiveBranchId(branch_id)}
                          type="radio"
                          className="switch-input is-valid"
                          checked={activeBranchId === branch_id}
                        />
                        <span className="switch-toggle-slider">
                          <span className="switch-on"></span>
                          <span className="switch-off"></span>
                        </span>
                        <span className="switch-label">{branch_name}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowChangeBranch(false)}
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

export default ChangeBranch;
