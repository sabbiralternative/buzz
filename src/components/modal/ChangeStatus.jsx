import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import useGetStatus from "../../hooks/HyperMaster/Branch/useGetStatus";
import handleRandomToken from "../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../api";
import useContextState from "../../hooks/useContextState";
import toast from "react-hot-toast";
import useRefetchClient from "../../hooks/Master/Client/useRefetchClient";
import { useLocation } from "react-router-dom";
import useGetClient from "../../hooks/Master/Client/useGetClient";

const ChangeStatus = ({
  setShowChangeStatus,
  downlineId,
  registrationStatus: regiStatus,
  role,
  id,
  refetchAllBranch,
}) => {
  const [disabled, setDisabled] = useState(false);
  const { token, adminRole, clientId } = useContextState();
  const [fetchClients, setFetchClients] = useState(false);
  const { refetchClient } = useRefetchClient(downlineId);
  const { refetchClients } = useGetClient(
    clientId,
    setFetchClients,
    fetchClients
  );
  const location = useLocation();

  /* close modal ck=lick outside */
  const statusRef = useRef();
  useCloseModalClickOutside(statusRef, () => {
    setShowChangeStatus(false);
  });

  const [betStatus, setBetStatus] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  let payload = {
    downlineId,
    type: "getStatus",
    id,
    role,
  };

  const { status, refetchStatus } = useGetStatus(payload);

  /* set check box default value */
  useEffect(() => {
    if (status?.bettingStatus === 0) {
      setBetStatus(false);
    } else {
      setBetStatus(true);
    }
    if (status?.userStatus === 0) {
      setUserStatus(false);
    } else {
      setUserStatus(true);
    }
    if (regiStatus === 0) {
      setRegistrationStatus(false);
    } else {
      setRegistrationStatus(true);
    }
  }, [status, regiStatus]);

  /* handle edit user lock */
  const handleChangeUserLock = async (e) => {
    setDisabled(true);
    e.preventDefault();
    const generatedToken = handleRandomToken();
    let payload = {
      id,
      downlineId,
      // registrationStatus: registrationStatus ? 1 : 0,
      type: "changeStatus",
      userStatus: userStatus ? 1 : 0,
      bettingStatus: betStatus ? 1 : 0,
      token: generatedToken,
      role,
    };

    if (
      location.pathname !== "/clients-with-balance" &&
      location.pathname !== "/view-client"
    ) {
      payload.registrationStatus = registrationStatus ? 1 : 0;
    }
    const res = await axios.post(API.downLineEdit, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      if (adminRole === "hyper_master") {
        refetchAllBranch();
      } else {
        refetchClients();
        refetchClient();
      }

      toast.success(data?.result?.message);
      setShowChangeStatus(false);
      refetchStatus();
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
                Change Status
              </h5>
              <button
                onClick={() => setShowChangeStatus(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleChangeUserLock}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        onChange={() => setUserStatus((prev) => !prev)}
                        type="checkbox"
                        className="switch-input is-valid"
                        checked={userStatus}
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">User Status</span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        onChange={() => setBetStatus((prev) => !prev)}
                        type="checkbox"
                        className="switch-input"
                        checked={betStatus}
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">Betting Status</span>
                    </label>
                  </div>
                </div>
                {location.pathname !== "/clients-with-balance" &&
                location.pathname !== "/view-client" ? (
                  <div className="row">
                    <div className="col mb-3">
                      <label className="switch">
                        <input
                          onChange={() =>
                            setRegistrationStatus((prev) => !prev)
                          }
                          type="checkbox"
                          className="switch-input"
                          checked={registrationStatus}
                        />
                        <span className="switch-toggle-slider">
                          <span className="switch-on"></span>
                          <span className="switch-off"></span>
                        </span>
                        <span className="switch-label">
                          Registration Status
                        </span>
                      </label>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowChangeStatus(false)}
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

export default ChangeStatus;
