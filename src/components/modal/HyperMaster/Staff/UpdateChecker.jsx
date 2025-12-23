import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import {
  useGetAllChecker,
  useGetSingleChecker,
  useUpdateSingleChecker,
} from "../../../../hooks/HyperMaster/Staff";
import toast from "react-hot-toast";
import useContextState from "../../../../hooks/useContextState";

const UpdateChecker = ({ setUpdateStatusId, updateStatusId }) => {
  const [disabled, setDisabled] = useState(false);
  const { adminRole } = useContextState();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: updateChecker } = useUpdateSingleChecker();
  const { refetch } = useGetAllChecker();
  const { data: checkerData } = useGetSingleChecker({
    type: "viewSingleStaff",
    staff_id: updateStatusId,
  });

  const checkerRef = useRef();
  useCloseModalClickOutside(checkerRef, () => {
    setUpdateStatusId(null);
  });

  const handleUpdateStatus = ({ status }) => {
    setDisabled(true);
    const payload = {
      type: "updateStaffStatus",
      staff_id: updateStatusId,
      status: status ? 1 : 0,
    };

    updateChecker(payload, {
      onSuccess: (data) => {
        if (data?.status) {
          setDisabled(false);
          refetch();
          setUpdateStatusId(null);
          toast.success(data?.result);
        } else {
          setDisabled(false);
          toast.error(data?.error);
        }
      },
    });
  };

  useEffect(() => {
    if (checkerData?.result?.length > 0) {
      reset({
        status: checkerData?.result?.[0]?.status == 1 ? true : false,
      });
    }
  }, [checkerData, reset]);

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
          <div className="modal-content" ref={checkerRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                {adminRole === "punter" ? "Staff" : "admin_staff"} Status
              </h5>
              <button
                onClick={() => setUpdateStatusId(null)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(handleUpdateStatus)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label className="switch">
                      <input
                        {...register("status")}
                        type="checkbox"
                        className="switch-input is-valid"
                      />
                      <span className="switch-toggle-slider">
                        <span className="switch-on"></span>
                        <span className="switch-off"></span>
                      </span>
                      <span className="switch-label">
                        {" "}
                        {adminRole === "punter" ? "Staff" : "admin_staff"}{" "}
                        Status
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setUpdateStatusId(null)}
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

export default UpdateChecker;
