import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useGetAllChecker,
  useGetSingleChecker,
  useUpdateSingleChecker,
} from "../../../hooks/HyperMaster/Staff";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import handleRandomToken from "../../../utils/handleRandomToken";
import useContextState from "../../../hooks/useContextState";
import { AdminRole } from "../../../constant/constant";

const UpdatePermission = ({ setShowPermission, showPermission }) => {
  const { adminRole } = useContextState();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const updatePermissionRef = useRef();
  useCloseModalClickOutside(updatePermissionRef, () => {
    setShowPermission(false);
  });

  const { data: checkerData } = useGetSingleChecker({
    type: "viewSingleStaff",
    staff_id: showPermission,
  });

  const { mutate: updatePermission } = useUpdateSingleChecker();
  const { refetch } = useGetAllChecker();

  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      ...values,
      type: "updateStaffRole",
      token: generatedToken,
      staff_id: showPermission,
    };

    updatePermission(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setDisabled(false);
          refetch();
          toast.success(data?.result);
          reset();
          setShowPermission(false);
        } else {
          setDisabled(false);
          toast.error(data?.error);
        }
      },
    });
  };
  const staffData = checkerData?.result?.[0]?.permissions;
  const deposit = staffData?.includes("deposit") ?? false;
  const withdraw = staffData?.includes("withdraw") ?? false;
  const client = staffData?.includes("client") ?? false;
  const payment = staffData?.includes("payment") ?? false;
  const report = staffData?.includes("report") ?? false;
  const exposure = staffData?.includes("exposure") ?? false;
  const settings = staffData?.includes("settings") ?? false;
  const directDeposit = staffData?.includes("directDeposit") ?? false;
  const depositWithSlip = staffData?.includes("depositWithSlip") ?? false;
  const directWithdraw = staffData?.includes("directWithdraw") ?? false;
  const bonus = staffData?.includes("bonus") ?? false;

  if (!checkerData?.success) {
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
          <div className="modal-content" ref={updatePermissionRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Update Permissions
              </h5>
              <button
                onClick={() => setShowPermission(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="row mb-3" id="ifsc_div">
                    <label
                      style={{ paddingTop: "0px" }}
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      Permissions
                    </label>
                    <div
                      className="col-sm-10"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "15px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          value="deposit"
                          defaultChecked={deposit}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Deposit
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="withdraw"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={withdraw}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Withdraw
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="client"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={client}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Client
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="payment"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={payment}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Payment
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="report"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={report}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Report
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="directDeposit"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={directDeposit}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Direct Deposit
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="depositWithSlip"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={depositWithSlip}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Deposit With Slip
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "3px",
                        }}
                      >
                        <input
                          value="directWithdraw"
                          style={{ height: "100%" }}
                          type="checkbox"
                          {...register("permissions", { required: true })}
                          defaultChecked={directWithdraw}
                        />
                        <p
                          style={{
                            margin: "0px",

                            height: "100%",
                          }}
                        >
                          Direct Withdraw
                        </p>
                      </div>
                      {adminRole === AdminRole.hyper_master && (
                        <Fragment>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "start",
                              gap: "3px",
                            }}
                          >
                            <input
                              value="exposure"
                              style={{ height: "100%" }}
                              type="checkbox"
                              {...register("permissions", { required: true })}
                              defaultChecked={exposure}
                            />
                            <p
                              style={{
                                margin: "0px",

                                height: "100%",
                              }}
                            >
                              Exposure
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "start",
                              gap: "3px",
                            }}
                          >
                            <input
                              value="settings"
                              style={{ height: "100%" }}
                              type="checkbox"
                              {...register("permissions", { required: true })}
                              defaultChecked={settings}
                            />
                            <p
                              style={{
                                margin: "0px",

                                height: "100%",
                              }}
                            >
                              Settings
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "start",
                              gap: "3px",
                            }}
                          >
                            <input
                              value="bonus"
                              style={{ height: "100%" }}
                              type="checkbox"
                              {...register("permissions", { required: true })}
                              defaultChecked={bonus}
                            />
                            <p
                              style={{
                                margin: "0px",

                                height: "100%",
                              }}
                            >
                              Bonus
                            </p>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowPermission(false)}
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

export default UpdatePermission;
