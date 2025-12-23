import { useNavigate } from "react-router-dom";
import useGetViewAllBanner from "../../../hooks/HyperMaster/Settings/useGetViewAllBanner";
import Swal from "sweetalert2";
import axios from "axios";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";
import useContextState from "../../../hooks/useContextState";
import toast from "react-hot-toast";

const ViewBanner = () => {
  const { token } = useContextState();
  const { banners, refetchAllBanners } = useGetViewAllBanner();
  const navigate = useNavigate();
  const handleNavigate = (banner, link) => {
    localStorage.removeItem("bannerId");
    localStorage.setItem("bannerId", banner?.banner_id);
    navigate(link);
  };

  const handleDeleteBanner = async (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const generatedToken = handleRandomToken();
        const payload = {
          type: "deleteBanner",
          bannerId: banner?.banner_id,
          token: generatedToken,
        };
        const res = await axios.post(API.banner, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.success) {
          refetchAllBanners();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      }
    });
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Banners</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Banner</th>
                <th>Site</th>

                <th>Sort</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {banners?.map((banner, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a>
                        <img src={banner?.banner_link} width="500px" />
                      </a>
                    </td>
                    <td>{banner?.site}</td>
                    <td>{banner?.priority}</td>

                    <td>
                      <span
                        className={`badge me-1 ${
                          banner?.status == 1
                            ? "bg-label-primary"
                            : "bg-label-danger"
                        }`}
                      >
                        {banner?.status == 1 ? "active" : "inactive"}
                      </span>
                    </td>

                    <td>
                      <a
                        style={{ color: "white" }}
                        onClick={() => handleNavigate(banner, "/edit-banner")}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        E
                      </a>
                      &nbsp;
                      <a
                        onClick={() => handleDeleteBanner(banner)}
                        style={{ color: "white" }}
                        className="btn btn-icon btn-sm btn-danger"
                      >
                        D
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBanner;
