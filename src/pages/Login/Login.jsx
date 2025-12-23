import toast from "react-hot-toast";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import handleEncryptData from "../../utils/handleEncryptData";
// import handleRandomToken from "../../utils/handleRandomToken";
import useContextState from "../../hooks/useContextState";
import { useEffect, useState } from "react";

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setGetToken } = useContextState();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      // username: "4ra1",
      // password: "Mnbv@1234",
    },
  });
  const navigate = useNavigate();

  /* handle login user */
  const onSubmit = async ({ username, password }) => {
    setDisabled(true);
    /* Random token generator */
    // const generatedToken = handleRandomToken();
    const loginData = {
      username: username,
      password: password,

      // token: generatedToken,
    };
    // /* Encrypted the post data */
    // const encryptedData = handleEncryptData(loginData);

    fetch(API.login, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        setGetToken((prev) => !prev);
        if (data?.success) {
          setDisabled(false);
          if (data?.result?.changePassword) {
            navigate(`/change-password?token=${data?.result?.token}`);
          }
          if (data?.result?.changePassword === false) {
            localStorage.setItem("readOnly", data?.result?.readOnly);
            localStorage.setItem("adminToken", data?.result?.token);
            localStorage.setItem("adminName", data?.result?.loginname);
            localStorage.setItem("adminRole", data?.result?.role);
            localStorage.setItem("adminSite", data?.result?.site);
            const modal = [
              { banner: data?.result?.banner },
              { bannerTitle: data?.result?.bannerTitle },
            ];
            localStorage.setItem("adminModal", JSON.stringify(modal));
            if (
              localStorage.getItem("adminToken") &&
              localStorage.getItem("adminName")
            ) {
              // if (data?.result?.authCode) {
              //   localStorage.setItem("authCode", data?.result?.authCode);
              //   navigate("/verification-login");
              // } else {
              toast.success("Login Success");
              navigate("/");
              // }
            }
          }
        } else {
          setDisabled(false);
          setErrorMessage(data?.error?.status?.[0]?.description);
        }
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner py-4">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    <svg
                      width="26px"
                      height="26px"
                      viewBox="0 0 26 26"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>icon</title>
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="linearGradient-1"
                        >
                          <stop stopColor="#5A8DEE" offset="0%"></stop>
                          <stop stopColor="#699AF9" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                          id="linearGradient-2"
                        >
                          <stop stopColor="#FDAC41" offset="0%"></stop>
                          <stop stopColor="#E38100" offset="100%"></stop>
                        </linearGradient>
                      </defs>
                      <g
                        id="Pages"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Login---V2"
                          transform="translate(-667.000000, -290.000000)"
                        >
                          <g
                            id="Login"
                            transform="translate(519.000000, 244.000000)"
                          >
                            <g
                              id="Logo"
                              transform="translate(148.000000, 42.000000)"
                            >
                              <g
                                id="icon"
                                transform="translate(0.000000, 4.000000)"
                              >
                                <path
                                  d="M13.8863636,4.72727273 C18.9447899,4.72727273 23.0454545,8.82793741 23.0454545,13.8863636 C23.0454545,18.9447899 18.9447899,23.0454545 13.8863636,23.0454545 C8.82793741,23.0454545 4.72727273,18.9447899 4.72727273,13.8863636 C4.72727273,13.5423509 4.74623858,13.2027679 4.78318172,12.8686032 L8.54810407,12.8689442 C8.48567157,13.19852 8.45300462,13.5386269 8.45300462,13.8863636 C8.45300462,16.887125 10.8856023,19.3197227 13.8863636,19.3197227 C16.887125,19.3197227 19.3197227,16.887125 19.3197227,13.8863636 C19.3197227,10.8856023 16.887125,8.45300462 13.8863636,8.45300462 C13.5386269,8.45300462 13.19852,8.48567157 12.8689442,8.54810407 L12.8686032,4.78318172 C13.2027679,4.74623858 13.5423509,4.72727273 13.8863636,4.72727273 Z"
                                  id="Combined-Shape"
                                  fill="#4880EA"
                                ></path>
                                <path
                                  d="M13.5909091,1.77272727 C20.4442608,1.77272727 26,7.19618701 26,13.8863636 C26,20.5765403 20.4442608,26 13.5909091,26 C6.73755742,26 1.18181818,20.5765403 1.18181818,13.8863636 C1.18181818,13.540626 1.19665566,13.1982714 1.22574292,12.8598734 L6.30410592,12.859962 C6.25499466,13.1951893 6.22958398,13.5378796 6.22958398,13.8863636 C6.22958398,17.8551125 9.52536149,21.0724191 13.5909091,21.0724191 C17.6564567,21.0724191 20.9522342,17.8551125 20.9522342,13.8863636 C20.9522342,9.91761479 17.6564567,6.70030817 13.5909091,6.70030817 C13.2336969,6.70030817 12.8824272,6.72514561 12.5388136,6.77314791 L12.5392575,1.81561642 C12.8859498,1.78721495 13.2366963,1.77272727 13.5909091,1.77272727 Z"
                                  id="Combined-Shape2"
                                  fill="url(#linearGradient-1)"
                                ></path>
                                <rect
                                  id="Rectangle"
                                  fill="url(#linearGradient-2)"
                                  x="0"
                                  y="0"
                                  width="7.68181818"
                                  height="7.68181818"
                                ></rect>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="app-brand-text demo h3 mb-0 fw-bold">
                    Panel
                  </span>
                </a>
              </div>
              <h4 className="mb-2">Welcome to Panel</h4>

              {errorMessage && (
                <div className="alert alert-solid-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <form
                id="formAuthentication"
                className="mb-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  <label htmlFor="loginname" className="form-label">
                    Referral ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="loginname"
                    {...register("username", {
                      required: true,
                    })}
                    name="username"
                    placeholder="Enter your Referral ID"
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="input-group input-group-merge">
                    <input
                      id="password"
                      className="form-control"
                      {...register("password", {
                        required: true,
                      })}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="input-group-text cursor-pointer"
                    >
                      <i
                        className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    disabled={disabled}
                    className="btn btn-primary d-grid w-100"
                    name="submit"
                    type="submit"
                    value="Sign In"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
