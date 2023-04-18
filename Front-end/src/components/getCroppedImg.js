/**
 * this function is used to crop the image
 *
 * @param {*} image
 * @param {*} crop
 * @param {*} fileName
 * @returns
 */
const getCroppedImg = (image, crop, fileName = "cropped") => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    };
    img.onerror = reject;
    img.src = image;
  });
};

export default getCroppedImg;
