import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../../../api";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import useGetSingleViewBonus from "../../../../hooks/HyperMaster/Bonus/useGetSingleViewBonus";
import { AdminRole } from "../../../../constant/constant";

const UpdateBonus = ({ setEditBonusId, editBonusId, refetchBonus }) => {
  const [disabled, setDisabled] = useState(false);
  const { singleBonus } = useGetSingleViewBonus(editBonusId);
  const editBonusRef = useRef();
  useCloseModalClickOutside(editBonusRef, () => {
    setEditBonusId("");
  });

  const { register, handleSubmit, reset } = useForm();
  const { token, adminRole } = useContextState();

  const handleUpdateBonus = async (value) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "updateBonus",
      bonus_id: editBonusId,
      ...value,
      token: generatedToken,
    };

    const res = await axios.post(API.bonus, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchBonus();
      reset();
      toast.success("Bonus updated successfully");
      setEditBonusId("");
    } else {
      setDisabled(false);
      toast.error(value?.error?.description);
    }
  };

  useEffect(() => {
    if (singleBonus && Object.keys(singleBonus)) {
      reset({
        bonus_name: singleBonus?.bonus_name,
        bonus_amount: singleBonus?.bonus_amount,
        bonus_amount_type: singleBonus?.bonus_amount_type,
        bonus_max_amount: singleBonus?.bonus_max_amount,
        wagering_multiplier: singleBonus?.wagering_multiplier,
        minimum_deposit: singleBonus?.minimum_deposit,
        bonus_expiry_days: singleBonus?.bonus_expiry_days,
        bonus_type: singleBonus?.bonus_type,
        status: singleBonus?.status?.toString(),
        no_of_use: singleBonus?.no_of_use,
      });
    }
  }, [singleBonus, reset]);

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
          <div className="modal-content" ref={editBonusRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Update Bonus
              </h5>
              <button
                onClick={() => setEditBonusId("")}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(handleUpdateBonus)}>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Name *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("bonus_name", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Method *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Deposit Bonus</span>
                      <input
                        type="radio"
                        {...register("bonus_type")}
                        value="deposit"
                        className=""
                        id="basic-default-name"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Registration Bonus</span>
                      <input
                        type="radio"
                        {...register("bonus_type")}
                        className=""
                        id="basic-default-name"
                        value="registration"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("bonus_amount", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Amount Type *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Percentage</span>
                      <input
                        type="radio"
                        {...register("bonus_amount_type")}
                        className=""
                        value="percentage"
                        id="basic-default-name"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Fixed Amount</span>
                      <input
                        type="radio"
                        {...register("bonus_amount_type")}
                        className=""
                        id="basic-default-name"
                        value="fixed_amount"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Expiry *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("bonus_expiry_days", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                {adminRole === AdminRole.hyper_master && (
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Number Of Usage *
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        {...register("no_of_use", {
                          required: true,
                        })}
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                )}

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Bonus Status *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Active</span>
                      <input
                        type="radio"
                        {...register("status")}
                        className=""
                        value="1"
                        id="basic-default-name"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <span>Inactive</span>
                      <input
                        type="radio"
                        {...register("status")}
                        className=""
                        id="basic-default-name"
                        value="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Min. Deposit amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("minimum_deposit", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Max Bonus Amount *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("bonus_max_amount", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Wagering Multiplier *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("wagering_multiplier", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
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
    </>
  );
};

export default UpdateBonus;
