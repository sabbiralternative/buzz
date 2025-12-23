import { writeFile, utils } from "xlsx";
import handleRandomToken from "../../utils/handleRandomToken";
import { API } from "../../api";
import axios from "axios";
import useContextState from "../../hooks/useContextState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowImage from "../../components/modal/ShowImage";
import { AdminRole } from "../../constant/constant";

const SecondDepositReport = () => {
  const [showFTDImage, setShowFTDImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setClientId, adminRole, setRefetchViewClient } =
    useContextState();
  const navigate = useNavigate();
  const [viewFRDData, setViewFTDData] = useState(false);
  const [FTDData, setFTDData] = useState([]);
  // const [totalFTD, setTotalFTD] = useState(null);

  const getFTDReport = async () => {
    const generatedToken = handleRandomToken();
    const payload = {
      type: "get2FTD",

      token: generatedToken,
      pagination: true,
    };
    const res = await axios.post(API.export, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const exportToExcel = async (e) => {
    e.preventDefault();
    const data = await getFTDReport();
    if (data?.success) {
      if (data?.result?.length > 0) {
        let firstDepositReports = data?.result;
        if (adminRole === "punter") {
          firstDepositReports = data?.result.map(
            // eslint-disable-next-line no-unused-vars
            ({ loginname, mobile, ...rest }) => rest
          );
        }
        const ws = utils.json_to_sheet(firstDepositReports);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");
        writeFile(wb, "ftd_data.xlsx");
      }
    }
  };

  const handleToggleViewFTD = async (e) => {
    e.preventDefault();
    const data = await getFTDReport();
    setViewFTDData(true);
    if (data?.success) {
      setFTDData(data?.result);
    }
  };

  let totalFTD = 0;
  for (let data of FTDData) {
    totalFTD += parseFloat(data?.amount);
  }
  // useEffect(() => {
  //   if (FTDData?.length > 0) {
  //     let totalFTD = 0;
  //     for (let data of FTDData) {
  //       totalFTD += parseFloat(data?.amount);
  //     }
  //     setTotalFTD(totalFTD?.toFixed(2));
  //   }
  // }, [FTDData]);

  return (
    <>
      {showFTDImage && (
        <ShowImage image={image} setShowImage={setShowFTDImage} />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                id="formValidationExamples"
                className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
              >
                <div className="col-12">
                  <input
                    onClick={handleToggleViewFTD}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="View"
                  />
                  <input
                    style={{ marginLeft: "10px" }}
                    onClick={exportToExcel}
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="Export"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {viewFRDData && (
          <>
            <hr className="my-3" />
            {totalFTD && <span> Total FRD : {totalFTD}</span>}
            {FTDData?.length > 0 ? (
              <div className="card">
                <h5 className="card-header">FRD Report</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover table-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>User Id</th>
                        <th>Login Name</th>
                        {adminRole === AdminRole.hyper_master ||
                        adminRole === AdminRole.admin_master ? (
                          <>
                            {/* <th>User Name</th> */}
                            <th>Mobile</th>
                          </>
                        ) : null}

                        <th>Amount</th>
                        <th>FRD Date</th>
                        <th>Image</th>
                        <th>Remark</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {FTDData?.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setClientId(data?.userId);
                                setRefetchViewClient(true);
                                navigate("/view-client");
                              }}
                            >
                              {data?.userId}
                            </td>
                            <td>{data?.loginname}</td>
                            {adminRole === AdminRole.hyper_master ||
                            adminRole === AdminRole.admin_master ? (
                              <>
                                {/* <td>{data?.loginname}</td> */}
                                <td>{data?.mobile}</td>
                              </>
                            ) : null}
                            <td>{data?.amount}</td>
                            <td>{data?.withdraw_date}</td>
                            <td>
                              {data?.image && (
                                <img
                                  onClick={() => {
                                    setImage("");
                                    setShowFTDImage(true);
                                    setImage(data?.image);
                                  }}
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    objectFit: "contain",
                                    cursor: "pointer",
                                  }}
                                  src={data?.image}
                                  alt=""
                                />
                              )}
                            </td>
                            <td>{data?.remark}</td>
                            <td>
                              <span
                                className={`badge ${
                                  data?.status == "APPROVED"
                                    ? "bg-label-primary"
                                    : "bg-label-warning"
                                } me-1`}
                              >
                                {data?.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card">
                <h5 style={{ fontSize: "18px" }} className="card-header">
                  No data found for given date range.
                </h5>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SecondDepositReport;
