import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onSelectImage }) => {
  return (
    <div className={styles.gallery}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onSelectImage(image)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
