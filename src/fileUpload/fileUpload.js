import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { ErrorApp } from './../utils/ErrorApp.js';
 const fileUploade = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ErrorApp("image only",401), false);
    }
  }

  const upload = multer({
    storage,
    fileFilter,
    // limits: {
    //   fileSize: 1 * 1024 * 1024,
    // },
  });
  return upload;
};
export const fileSinglefile= (fieldName,folderName )=>fileUploade(folderName).single(fieldName)
export const fileMixfiles= (arrayOfImgs,folderName)=>fileUploade(folderName).fields(arrayOfImgs)