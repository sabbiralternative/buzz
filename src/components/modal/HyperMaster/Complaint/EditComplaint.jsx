import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { AxiosSecure } from "../../../../lib/AxiosSecure";
import { API } from "../../../../api";
import useComplaints from "../../../../hooks/complaints";
import { useForm } from "react-hook-form";

const EditComplaint = ({ setComplaintId, complaintId, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(false);
  const { data } = useComplaints({
    type: "viewSingleComplaint",
    complaint_id: complaintId,
  });

  const closeModal = () => {
    setComplaintId(null);
  };

  const complaintRef = useRef();
  useCloseModalClickOutside(complaintRef, () => {
    closeModal();
  });

  const handleChangeStatus = async ({ admin_message }) => {
    setDisabled(true);

    const payload = {
      complaint_id: complaintId,
      type: "editComplaint",
      status: status ? 1 : 0,
      admin_message,
    };

    const res = await AxiosSecure.post(API.complaint, payload);
    const data = res.data;
    if (data?.success) {
      refetch();
      setDisabled(false);
      toast.success(data?.result?.message);
      closeModal();
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  useEffect(() => {
    if (data && data?.result) {
      setStatus(data?.result?.status === 0 ? false : true);
      reset({
        admin_message: data?.result?.admin_message,
      });
    }
  }, [data, reset]);

  if (!data || !data?.result) {
    return null;
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
          <div className="modal-content" ref={complaintRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Edit Complaint
              </h5>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(handleChangeStatus)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        onChange={() => setStatus((prev) => !prev)}
                        type="checkbox"
                        className="switch-input is-valid"
                        checked={status}
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">Resolved</span>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="nameWithTitle" className="form-label">
                      Client Message
                    </label>
                    <textarea
                      readOnly
                      value={data?.result?.message}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="nameWithTitle" className="form-label">
                      Admin Message
                    </label>
                    <textarea
                      {...register("admin_message")}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={closeModal}
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

export default EditComplaint;
