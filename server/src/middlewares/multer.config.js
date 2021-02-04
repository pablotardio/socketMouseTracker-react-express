
const multer =require('multer');
const path =require('path');
const fileDestination=path.join(__dirname,'../public/uploads');
//module to have unique id
const uuid=require('uuid');

const storage =multer.diskStorage(
    {
        destination:fileDestination,
        filename: (req,file,cb)=>{
            cb(null,uuid.v4()+path.extname(file.originalname));
        }
    }
)

const uploadFile=multer({
    storage,
    destination:fileDestination,
    // limits:{fileSize:10000}
}).single('foto'); //valor del name=" " que tiene el formulario


const uploadMultipleFiles=multer({
    storage,
    destination:fileDestination,
    // limits:{fileSize:10000}
}).array('fotos'); //valor del name=" " que tiene el formulario

module.exports={uploadFile,uploadMultipleFiles};