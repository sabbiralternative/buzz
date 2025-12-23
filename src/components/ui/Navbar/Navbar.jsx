import { useEffect, useRef, useState } from "react";
import useContextState from "../../../hooks/useContextState";
import Dropdown from "./Dropdown";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { Link } from "react-router-dom";
import profileImg from "../../../../src/assets/img/avatars/1.png";
import moment from "moment";

const Navbar = () => {
  const [time, setTime] = useState();
  const { adminName, adminRole, setShowSidebar } = useContextState();
  const [showDropdown, setShowDropdown] = useState(false);

  /* close modal click outside */
  const dropdownRef = useRef();
  useCloseModalClickOutside(dropdownRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    setTimeout(() => {
      setTime(moment().format("h:mm:ss a"));
    }, 1000);
  }, [time]);

  return (
    <nav
      className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="container-xxl">
        <div className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
          <Link to="/" className="app-brand-link gap-2">
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
                    <g id="Login" transform="translate(519.000000, 244.000000)">
                      <g id="Logo" transform="translate(148.000000, 42.000000)">
                        <g id="icon" transform="translate(0.000000, 4.000000)">
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
            <span className="app-brand-text demo menu-text fw-bold">B2C</span>
          </Link>

          <a className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
            <i className="bx bx-x bx-sm align-middle"></i>
          </a>
        </div>

        {/* Open sidebar  */}
        <div
          onClick={() => setShowSidebar((prev) => !prev)}
          className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
        >
          <a className="nav-item nav-link px-0 me-xl-4">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>
        {/* Open sidebar  */}
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <ul
            className="navbar-nav flex-row align-items-center ms-auto"
            style={{ width: "100%", justifyContent: "end" }}
          >
            <li
              className="nav-item navbar-search-wrapper me-2 me-xl-0"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <a className="nav-item nav-link search-toggler">
                <i className="bx bx-search bx-sm"></i>
              </a> */}
              <span> {moment().format("MMMM Do YYYY")}</span>
              <span> {time}</span>
            </li>

            <li
              style={{ marginLeft: "20px" }}
              ref={dropdownRef}
              className="nav-item navbar-dropdown dropdown-user dropdown"
            >
              <a
                onClick={() => setShowDropdown((prev) => !prev)}
                className="nav-link dropdown-toggle hide-arrow show"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img src={profileImg} className="rounded-circle" />
                </div>
              </a>
              <Dropdown
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                adminName={adminName}
                adminRole={adminRole}
                profileImg={profileImg}
              />
            </li>
          </ul>
        </div>

        <div className="navbar-search-wrapper search-input-wrapper container-xxl d-none">
          <input
            type="text"
            className="form-control search-input border-0"
            placeholder="Search..."
            aria-label="Search..."
          />
          <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
