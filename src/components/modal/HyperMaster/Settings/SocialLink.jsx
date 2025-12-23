import toast from "react-hot-toast";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";
import { useForm } from "react-hook-form";
import handleRandomToken from "../../../../utils/handleRandomToken";
import useContextState from "../../../../hooks/useContextState";
import axios from "axios";
import { API } from "../../../../api";
import useGetAllSocialLink from "../../../../hooks/HyperMaster/Settings/useGetAllSocialLink";
import { useWhiteLabel } from "../../../../hooks/AdminMaster/whiteLabel";
import { AdminRole } from "../../../../constant/constant";

const SocialLink = ({ setShowSocialLink }) => {
  const { data } = useWhiteLabel({
    type: "viewWhitelabelByAdmin",
  });

  const [disabled, setDisabled] = useState(false);
  const { socialLinks, refetchAllSocialLinks, isLoading } =
    useGetAllSocialLink();

  /* close modal click outside */
  const socialLinkRef = useRef();
  useCloseModalClickOutside(socialLinkRef, () => {
    setShowSocialLink(false);
  });

  const { register, handleSubmit, reset } = useForm({});
  const { token, adminRole } = useContextState();

  /* handle edit social link */
  const onSubmit = async ({ whatsapp, instagram, telegram, site }) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    //   const encryptedData = handleEncryptData({
    //     newPassword: newPassword,
    //     confirmPassword: newPasswordConfirm,
    //     mpassword: transactionCode,
    //     type: "panel",
    //     token: generatedToken,
    //   });
    let payload = {};

    if (adminRole === "punter") {
      payload = {
        type: "updateSocial",
        whatsapp,
        token: generatedToken,
      };
    } else {
      payload = {
        type: "updateSocial",
        whatsapp,
        instagram,
        telegram,
        site,
        token: generatedToken,
      };
    }

    const res = await axios.post(API.socialLinks, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success(data?.result?.message);
      reset();
      setShowSocialLink(false);
      refetchAllSocialLinks();
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
          <div className="modal-content" ref={socialLinkRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Social Links
              </h5>
              <button
                onClick={() => setShowSocialLink(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
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
                              <option
                                key={site?.site_url}
                                value={site?.site_url}
                              >
                                {site?.site_url}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Whatsapp
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("whatsapp", {
                          value: socialLinks?.[0]?.whatsapp,
                        })}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        placeholder=""
                      />
                    </div>
                  </div>
                  {adminRole !== "punter" && (
                    <>
                      <div className="row mb-3" id="bank_account_number_div">
                        <label
                          className="col-sm-2 col-form-label"
                          htmlFor="basic-default-company"
                        >
                          Instagram
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("instagram", {
                              value: socialLinks?.[0]?.instagram,
                            })}
                            type="text"
                            className="form-control"
                            id="basic-default-company"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="row mb-3" id="ifsc_div">
                        <label
                          className="col-sm-2 col-form-label"
                          htmlFor="basic-default-company"
                        >
                          Telegram
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("telegram", {
                              value: socialLinks?.[0]?.telegram,
                            })}
                            type="text"
                            className="form-control"
                            id="basic-default-company"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowSocialLink(false)}
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

export default SocialLink;
