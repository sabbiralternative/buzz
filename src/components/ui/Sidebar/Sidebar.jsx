import { useRef } from "react";
import useContextState from "../../../hooks/useContextState";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import MasterSidebar from "./MasterSidebar";

const Sidebar = () => {
  const { setShowSidebar, showSidebar } = useContextState();
  /* close modal click outside */
  const sidebarRef = useRef();
  useCloseModalClickOutside(sidebarRef, () => {
    setShowSidebar(false);
  });
  return (
    <aside
      ref={sidebarRef}
      id="layout-menu"
      className="layout-menu menu menu-vertical bg-menu-theme"
      style={{
        touchAction: "none",
        userSelect: "none",
        transform: `translate(${showSidebar ? "0" : "-100%"}, 0)`,
        transition: "0.5s",
        transitionDuration: ".3s",
      }}
      //   "
      //   touch-action: none;
      //   user-select: none;
      //   -webkit-user-drag: none;
      //   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      // "
      // data-bg-className="bg-menu-theme"
    >
      <div className="container-xxl d-flex h-100 flex-column p-0">
        <a className="menu-horizontal-prev d-none"></a>
        <div className="navbar-brand app-brand demo d-xl-flex py-0 me-4">
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
          </a>

          <a
            onClick={() => setShowSidebar(false)}
            className="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
          >
            <i className="bx bx-x bx-sm align-middle"></i>
          </a>
        </div>
        {/* {adminRole === "hyper_master" ||
        adminRole === "admin_master" ||
        adminRole === AdminRole.super_master ? (
          <HyperMasterSidebar />
        ) : null} */}

        <MasterSidebar />

        <div className="menu-horizontal-wrapper"></div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default Sidebar;
