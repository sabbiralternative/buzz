import toast from "react-hot-toast";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import axios from "axios";
import { API } from "../../../../api";
import useGetSiteNotification from "../../../../hooks/HyperMaster/Settings/useGetSiteNotification";

const SiteNotification = ({ setSiteNotification }) => {
  const [disabled, setDisabled] = useState(false);
  const { siteNotification, isLoading } = useGetSiteNotification();

  /* close modal click outside */
  const siteNotifyRef = useRef();
  useCloseModalClickOutside(siteNotifyRef, () => {
    setSiteNotification(false);
  });

  const { register, handleSubmit, reset } = useForm({});
  const { token } = useContextState();

  /* handle edit site notification */
  const onSubmit = async ({ message }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "setNotification",
      message,
      token: generatedToken,
    };
    const res = await axios.post(API.notification, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      setSiteNotification(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  if (isLoading) {
    return;
  }
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
          <div className="modal-content" ref={siteNotifyRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Site Notification
              </h5>
              <button
                onClick={() => setSiteNotification(false)}
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
                      Notification
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("message", {
                          value: siteNotification,
                        })}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setSiteNotification(false)}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteNotification;
