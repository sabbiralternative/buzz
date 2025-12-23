import axios from "axios";
import { API } from "../../../api";
import toast from "react-hot-toast";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { AdminRole } from "../../../constant/constant";
import { useState } from "react";

const AddBonus = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { token, adminRole } = useContextState();

  /* handle add client */
  const onSubmit = async (value) => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "addBonus",
      ...value,
      token: generatedToken,
    };
    setDisabled(true);
    const res = await axios.post(API.bonus, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success("Bonus added successfully");
      reset();
      navigate("/view-bonus");
    } else {
      setDisabled(false);
      toast.error(value?.error?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Bonus
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    {adminRole !== AdminRole.hyper_master && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <span>First Deposit Bonus</span>
                        <input
                          type="radio"
                          {...register("bonus_type")}
                          value="first_deposit"
                          className=""
                          id="basic-default-name"
                        />
                      </div>
                    )}

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
                    Bonus Expiry (In days) *
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
    </div>
  );
};

export default AddBonus;
