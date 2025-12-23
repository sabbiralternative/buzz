import { Link, useLocation } from "react-router-dom";

const ChangePasswordSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionCode = searchParams.get("transactionCode");
  return (
    <div className="cp-success-box">
      <div
        className="text-center container"
        style={{
          paddingTop: "100px",
        }}
      >
        <h1
          style={{
            fontSize: "2.03125rem",
            fontWeight: "500",
            lineHeight: "1.2",
          }}
        >
          <span className="text-success">
            Success! Your password has been updated successfully.
          </span>
        </h1>
        <h1
          style={{
            fontSize: "2.03125rem",
            fontWeight: "500",
            lineHeight: "1.2",
            margin: "4px",
          }}
        >
          Your transaction password is
          <span className="text-info token-box"> {transactionCode}</span>.
        </h1>
        <h2
          style={{
            fontSize: "1.625rem",
            fontWeight: "500",
            lineHeight: "1.2",
            margin: "2px",
          }}
        >
          Please remember this transaction password, from now on all transcation
          of the website can be done only with this password and keep one thing
          in mind, do not share this password with anyone.
        </h2>
        <h2
          className="mt-3 text-dark"
          style={{
            fontSize: "1.625rem",
            fontWeight: "500",
            lineHeight: "1.2",
            margin: "4px",
          }}
        >
          Thank you
        </h2>
        <div className="font-hindi">
          <h1
            style={{
              fontSize: "2.03125rem",
              fontWeight: "500",
              lineHeight: "1.2",
              margin: "4px",
            }}
            className="mt-5"
          >
            <span className="text-success">
              Success! आपका पासवर्ड बदला जा चुका है।
            </span>
          </h1>
          <h1
            style={{
              fontSize: "2.03125rem",
              fontWeight: "500",
              lineHeight: "1.2",
              margin: "4px",
            }}
          >
            आपका लेनदेन पासवर्ड
            <span className="text-info token-box"> {transactionCode}</span> है।
          </h1>
          <h2
            style={{
              fontSize: "1.625rem",
              fontWeight: "500",
              lineHeight: "1.2",
              margin: "4px",
            }}
          >
            कृपया इस लेन-देन के पासवर्ड को याद रखें, अब से वेबसाइट के सभी
            हस्तांतरण केवल इस पासवर्ड से किए जा सकते हैं और एक बात का ध्यान
            रखें, इस पासवर्ड को किसी के साथ साझा न करें।
          </h2>
          <h2
            style={{
              fontSize: "1.625rem",
              fontWeight: "500",
              lineHeight: "1.2",
              margin: "1.3rem 4px 4px",
            }}
            className="mt-3 text-dark"
          >
            धन्यवाद
          </h2>
        </div>
        <Link
          className="btn btn-dark btn-lg mt-5 router-link-active"
          to="/login"
          style={{ minWidth: "200px" }}
        >
          <i className="fas fa-arrow-left mr-3"></i>Back
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordSuccess;
