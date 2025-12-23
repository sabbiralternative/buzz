import axios from "axios";
import { useEffect, useState } from "react";
import useContextState from "../../../hooks/useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useGetViewAllBanner from "../../../hooks/HyperMaster/Settings/useGetViewAllBanner";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";
import { useWhiteLabel } from "../../../hooks/AdminMaster/whiteLabel";
import { AdminRole } from "../../../constant/constant";

const AddLoginBanner = () => {
  const { data } = useWhiteLabel({
    type: "viewWhitelabelByAdmin",
  });

  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { refetchAllBanners } = useGetViewAllBanner();
  const { register, handleSubmit, reset, watch } = useForm();
  const { token, adminRole } = useContextState();
  const [filePath, setFilePath] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const site = watch("site");

  /* Upload image */
  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const payload = {
          type: "banner",
        };
        formData.append("data", JSON.stringify(payload));
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setLoading(false);
        if (data?.success) {
          setFilePath(data?.filePath);
        }
      };
      handleSubmitImage();
    }
  }, [image, token]);

  const onSubmit = async (fieldValues) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      ...fieldValues,
      type: "addLoginBanner",
      banner_link: filePath,
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
      navigate("/");
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };

  const handleDeleteCurrentImage = async () => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      type: "deleteLoginBanner",
      token: generatedToken,
      site: site || null,
    };
    const res = await axios.post(API.banner, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
    } else {
      setDisabled(false);
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Login Banner
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {adminRole === AdminRole.hyper_master &&
                  data?.result?.length > 0 && (
                    <div className="row mb-3" id="bank_account_name_div">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Site *
                      </label>
                      <div className="col-sm-10">
                        <select
                          defaultValue=""
                          {...register("site", {
                            required: true,
                          })}
                          className="form-control"
                        >
                          <option disabled value="">
                            Select Site
                          </option>
                          {data?.result?.map((site) => (
                            <option key={site?.site_url} value={site?.site_url}>
                              {site?.site_url}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                {!loading && !filePath && (
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Banner Image
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        name="banner_link"
                        className="form-control"
                        required
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                )}

                {!loading && filePath && (
                  <div className="row mb-3">
                    <span
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      <RxCross2
                        onClick={() => setFilePath("")}
                        size={30}
                        cursor="pointer"
                      />
                    </span>
                    <div className="col-sm-10">
                      <img
                        style={{ height: "200px", objectFit: "contain" }}
                        className="form-control"
                        src={filePath}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="row mb-3" id="qr_code">
                    <span
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-company"
                    >
                      {" "}
                      QR Code
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                      className="col-sm-10"
                    >
                      <FaSpinner size={30} className="animate-spin" />
                    </div>
                  </div>
                )}

                <div className="row justify-content-end">
                  <div className="col-sm-10 ">
                    <input
                      disabled={!filePath || disabled}
                      type="submit"
                      name="submit"
                      value="Add New Login Banner"
                      className="btn btn-primary"
                    />
                    <button
                      disabled={disabled}
                      onClick={handleDeleteCurrentImage}
                      className="btn btn-primary responsive-button"
                      type="button"
                    >
                      Delete Current Login Banner
                    </button>
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

export default AddLoginBanner;
