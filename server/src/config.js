const dotenv = require('dotenv');
dotenv.config();
const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_TYPE, SESSION_SECRET,
    CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
    AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION } = process.env;

module.exports = {
    port: PORT,
    //DATABASE
    DBtype: DB_TYPE,
    DBhost: DB_HOST,
    DBuser: DB_USER,
    DBpassword: DB_PASSWORD,
    DBname: DB_NAME,
    DBport: DB_PORT,
    session_secret: SESSION_SECRET,
    //CLOUDINARY
    cloudinary_cloud_name: CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: CLOUDINARY_API_KEY,
    cloudinary_api_secret: CLOUDINARY_API_SECRET,
    //AWS
    aws_access_key_id: AWS_ACCESS_KEY_ID,
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY,
    aws_bucket_name: AWS_BUCKET_NAME,
    aws_region: AWS_REGION

}