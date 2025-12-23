import { useRef } from "react";
import useCloseModalClickOutside from "../../../../hooks/useCloseModalClickOutside";

const Slip = ({ setShowImage, image }) => {
  const slipRef = useRef();
  useCloseModalClickOutside(slipRef, () => {
    setShowImage(false);
  });

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
          <div className="modal-content" ref={slipRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Slip
              </h5>
              <button
                onClick={() => setShowImage(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <div className="modal-body">
                <div className="row">
                  <img src={image} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slip;
