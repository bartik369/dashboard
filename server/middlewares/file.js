import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({

    destination(req, file, cb) {
        const { conversationId } = req.body
        cb(null, `media/messenger/${conversationId}`)
    },
    filename(req, file, cb) {
        const newName = uuidv4()
            // cb(null, newName + '-' + file.originalname)
        cb(null, file.originalname)
    }

});

// const types = ['image/png', 'image/jpg', 'image/jpeg']

// const fileFilter = (req, file, cb) => {

//     if (types.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// export default multer({ storage, fileFilter });
export default multer({ storage });