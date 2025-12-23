import { useEffect } from "react";
/* Close modal click outside */
const useCloseModalClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref) {
        if (!ref?.current?.contains(e?.target)) {
          callback();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useCloseModalClickOutside;
