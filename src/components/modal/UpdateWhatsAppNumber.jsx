import { useForm } from "react-hook-form";
import useContextState from "../../hooks/useContextState";
import handleRandomToken from "../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../api";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { useRef, useState } from "react";
import { useDownLineEdit } from "../../hooks/downLineEdit";

const UpdateWhatsAppNumber = ({
  downlineId,
  setShowWhatsApp,
  role,
  id,
  refetchAllBranch,
}) => {
  /* close modal click outside */
  const [disabled, setDisabled] = useState(false);
  const whatsAppRef = useRef();
  useCloseModalClickOutside(whatsAppRef, () => {
    setShowWhatsApp(false);
  });

  const { register, handleSubmit, reset } = useForm();
  const { token } = useContextState();

  let payload = {
    downlineId,
    id,
    role,
    type: "viewWhatsapp",
  };

  const { data, isSuccess } = useDownLineEdit(payload);

  /* handle update credit reference */
  const onSubmit = async ({ mobile }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      id,
      downlineId,
      mobile,
      type: "updateWhatsapp",
      token: generatedToken,
      role,
    };
    const res = await axios.post(API.downLineEdit, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchAllBranch();
      toast.success(data?.result?.message);
      reset();
      setShowWhatsApp(false);
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  if (!isSuccess) {
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
          <div className="modal-content" ref={whatsAppRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Whatsapp Number
              </h5>
              <button
                onClick={() => setShowWhatsApp(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="row">
                <div className="row mb-3" id="bank_account_name_div">
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Username
                    </label>
                    <div className="col-sm-10">{data?.result?.loginname}</div>
                  </div>

                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Whatsapp number
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("mobile", {
                          required: true,
                          value: data?.result?.whatsapp,
                        })}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowWhatsApp(false)}
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

export default UpdateWhatsAppNumber;
