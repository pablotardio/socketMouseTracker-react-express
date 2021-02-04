var AWS = require('aws-sdk');
const { promisify } = require('util');
const { aws_bucket_name, aws_access_key_id, aws_secret_access_key, aws_region } = require('../config'); //Enviroment variables
let s3 = new AWS.S3(); //obtiene las api keys de las variables de entorno para el uso de s3 (Storage para files)
//Config for rekognition
const config = new AWS.Config({
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
    region: aws_region
})
const fs = require('fs-extra');
// Los nombres de buckets deben ser únicos entre todos los usuarios de S3

const awsConfig = {
    rekognition: {
        /**
         * A method that compares two faces of images uploaded to the aws s3 budget
         * @param {*} source 
         * @param {*} target 
         */
        compareFacesPrint: (photo_source, photo_target) => {
            const client = new AWS.Rekognition();
            const params = {
                SourceImage: {
                    S3Object: {
                        Bucket: aws_bucket_name,
                        Name: photo_source
                    },
                },
                TargetImage: {
                    S3Object: {
                        Bucket: aws_bucket_name,
                        Name: photo_target
                    },
                },
                SimilarityThreshold: 70
            }
            client.compareFaces(params, function (err, response) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                } else {
                    response.FaceMatches.forEach(data => {
                        let position = data.Face.BoundingBox
                        let similarity = data.Similarity
                        console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
                    }) // for response.faceDetails
                } // if
            });
        },
        compareFaces: async (photo_source, photo_target) => {
            try {
                const client = new AWS.Rekognition();
                const params = {
                    SourceImage: {
                        S3Object: {
                            Bucket: aws_bucket_name,
                            Name: photo_source
                        },
                    },
                    TargetImage: {
                        S3Object: {
                            Bucket: aws_bucket_name,
                            Name: photo_target
                        },
                    },
                    SimilarityThreshold: 70
                }
                let compareFacesPromise = promisify(client.compareFaces).bind(client);
                let response = await compareFacesPromise(params)
                // for response.faceDetails
                if (response.FaceMatches!=[]) {
                    let similarity=0;
                    response.FaceMatches.forEach(data => {
                        let position = data.Face.BoundingBox
                         similarity = data.Similarity
                        console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
                        
                    })
                    return similarity;   
                }else{
                    return 0
                }

                    
               
            } catch (error) {
                console.log(error);
            }

        }

    },
    /**
     * This method will upload a object to amazon s3 and delete it from the local storage (folder uploads)
     * @param {*} fileReq  is the file atribute of the request
     */
    uploadToS3: async (fileReq) => {
        //Extracting the buffer from a path to be uploaded
        const fileBuffer = fs.readFileSync(fileReq.path); 
        const params = {
            Bucket: aws_bucket_name,
            Key: fileReq.filename,
            Body: fileBuffer//Does not work with a path
        };
        s3.upload(params,
            (error, data) => {
                if (error) {
                    console.log(error);
                }
                console.log(data)
            })
        await fs.unlink(fileReq.path) //Borra el archivo subido
    }

}
module.exports = { awsConfig }


