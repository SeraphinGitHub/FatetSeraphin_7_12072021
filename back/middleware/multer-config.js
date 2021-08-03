
const multer = require("multer");

const MIMES_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
	"image/gif": "gif",
}

const storage = multer.diskStorage({
    
    destination: (req, file, callback) => {
        callback(null, "pictures");
    },

    filename: (req, file, callback) => {        
        const name = file.originalname.split(" ").join("_");
        callback(null, Date.now() + "." + name);
    }
});

module.exports = multer({ storage }).single("image");

