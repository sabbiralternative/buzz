import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCampaign } from "../../hooks/campaign";

const AddCampaign = () => {
  const { mutate: addCampaign, isPending } = useCampaign();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    const payload = {
      type: "addCampaign",
      ...values,
    };

    addCampaign(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success("Campaign added successfully");
          reset();
          navigate("/view-campaigns");
        } else {
          toast.error(data?.error?.description);
        }
      },
    });
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Campaign
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
                    Campaign Name *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("campaign_name", { required: true })}
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
                    Campaign Id *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("campaign_id", { required: true })}
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
                    Status *
                  </label>
                  <div
                    className="col-sm-10"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0px 40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0px 5px",
                      }}
                    >
                      Active
                      <input
                        type="radio"
                        style={{ marginTop: "3px" }}
                        {...register("status", { required: true })}
                        value="1"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0px 5px",
                      }}
                    >
                      Inactive
                      <input
                        style={{ marginTop: "3px" }}
                        type="radio"
                        {...register("status", { required: true })}
                        value="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={isPending}
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

export default AddCampaign;
