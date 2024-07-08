import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
const storage = new GridFsStorage({
    url: `mongodb+srv://Habeeb:Ademola1234@habeeb.pal57xa.mongodb.net/Blog?retryWrites=true&w=majority`,
    options: {useNewUrlPaser: true},
    file:(req, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }

    }
})

export default multer({storage})