import { useState } from "react";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import Slip from "../../../components/modal/Master/Deposit/Slip";

const UTRSearch = () => {
  const [utr, setUtr] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [utrData, setUtrData] = useState([]);

  const searchUTR = async (e) => {
    e.preventDefault();
    const payload = {
      type: "searchUTR",
      utr,
      pagination: true,
    };
    const { data } = await AxiosSecure.post(API.utr, payload);
    if (data?.success) {
      setUtrData(data?.result);
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="col-12">
        <div className="card">
          {showImage && <Slip setShowImage={setShowImage} image={image} />}
          <div className="card-body">
            <form
              id="formValidationExamples"
              className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              onSubmit={searchUTR}
            >
              <div className="col-md-6 fv-plugins-icon-container">
                <input
                  onChange={(e) => setUtr(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search User"
                  value={utr}
                />
                <div className="fv-plugins-message-container invalid-feedback"></div>
              </div>

              <div className="col-12">
                <input
                  disabled={utr?.length < 2}
                  type="submit"
                  name="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {utrData?.length > 0 && (
        <>
          <hr className="my-3" />
          <div className="card">
            <h5 className="card-header">Clients</h5>
            <div className="table-responsive text-nowrap">
              <table className="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Login Name</th>
                    <th>Amount</th>
                    <th>Date Added</th>
                    <th>Date Modified</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {utrData?.map((client, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <strong>{client?.user_id}</strong>
                        </td>
                        <td>{client?.loginnameVisible && client?.loginname}</td>
                        <td>
                          <strong>{client?.amount}</strong>
                        </td>

                        <td>
                          <strong>{client?.date_added}</strong>
                        </td>
                        <td>{client?.date_modified}</td>

                        <td>
                          {client?.image ? (
                            <span
                              onClick={() => {
                                setShowImage(true);
                                setImage(client?.image);
                              }}
                              style={{ color: "#346cee", cursor: "pointer" }}
                            >
                              View
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge me-1
                      ${client?.status === "PENDING" ? "bg-label-warning" : ""}
                      ${client?.status === "APPROVED" ? "bg-label-success" : ""}
                      ${client?.status === "REJECTED" ? "bg-label-danger" : ""}
                      `}
                          >
                            {client?.status}
                          </span>
                        </td>
                        <td>
                          <strong>{client?.remark}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {!loading && utrData?.length === 0 && (
        <div className="card">
          <h5 style={{ fontSize: "18px" }} className="card-header">
            No UTR found
          </h5>
        </div>
      )}
    </div>
  );
};

export default UTRSearch;
