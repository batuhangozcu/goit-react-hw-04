import Modal from "react-modal";
import { useEffect } from "react";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <Modal isOpen={!!image} onRequestClose={onClose} className={styles.modal}>
      {image && <img src={image.urls.regular} alt={image.description} />}
    </Modal>
  );
};

export default ImageModal;
