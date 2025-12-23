import { useForm } from "react-hook-form";
import useGetSingleBanner from "../../../hooks/HyperMaster/Settings/useGetSingleBanner";
import handleRandomToken from "../../../utils/handleRandomToken";
import { API } from "../../../api";
import axios from "axios";
import useContextState from "../../../hooks/useContextState";
import useGetViewAllBanner from "../../../hooks/HyperMaster/Settings/useGetViewAllBanner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditBanner = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { token } = useContextState();
  const { register, handleSubmit, reset } = useForm();
  const bannerId = localStorage.getItem("bannerId");
  const { singleBanner, isLoading, isFetching } = useGetSingleBanner(bannerId);
  const { refetchAllBanners } = useGetViewAllBanner();

  /* handle edit banner */
  const onSubmit = async ({ status, priority }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "updateBanner",
      bannerId,
      status,
      priority,
      token: generatedToken,
    };
    const res = await axios.post(API.banner, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      refetchAllBanners();
      toast.success(data?.result?.message);
      reset();
      navigate("/view-banner");
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  if (isLoading || isFetching || singleBanner?.length === 0) {
    return;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Edit Banner
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="bank_account_number_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-company"
                  >
                    Priority
                  </label>
                  <div className="col-sm-10">
                    <input
                      {...register("priority", {
                        required: true,
                        value: singleBanner?.[0]?.priority,
                      })}
                      type="number"
                      className="form-control"
                      required
                      id="basic-default-company"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="exampleFormControlSelect1"
                    className="col-sm-2 col-form-label"
                  >
                    Status
                  </label>
                  <div className="col-sm-9" data-select2-id="26">
                    <div className="position-relative" data-select2-id="25">
                      <select
                        {...register("status", {
                          required: true,
                          value: singleBanner?.[0]?.status,
                        })}
                        className="select2 form-select select2-hidden-accessible"
                      >
                        <option
                          selected={singleBanner?.[0]?.priority == 1}
                          value="1"
                        >
                          Active
                        </option>
                        <option
                          selected={singleBanner?.[0]?.priority == 1}
                          value="0"
                        >
                          Inactive
                        </option>
                      </select>
                    </div>
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

export default EditBanner;
