import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";

const ShowImage = ({ image, setShowImage }) => {
  const showImageRef = useRef();
  useCloseModalClickOutside(showImageRef, () => {
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
          <div className="modal-content" ref={showImageRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Image
              </h5>
              <button
                onClick={() => setShowImage(false)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div
                    className="col mb-3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        height: "500px",
                        width: "500px",
                        objectFit: "contain",
                      }}
                      src={image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowImage(false)}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowImage;
