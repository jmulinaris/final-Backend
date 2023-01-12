import { fileURLToPath } from "url";
import { dirname, extname, join } from "path";
import multer from "multer";

//* Configuración de Multer
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/jpg", "image/png", "image/jpeg"];

const upload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR, "../public/uploads"),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];
            cb(null, `${fileName}-${Date.now()}${fileExtension}`);
        }
    }),
    fileFilter: (req, file, cb) =>{
        if (MIMETYPES.includes(file.mimetype)) cb (null, true)
        else cb(new Error (`Solo permitidos los archivos ${MIMETYPES.join(" ")}`))
    },
    limits: {
        fieldSize: 10000000
    }
});

export default upload;