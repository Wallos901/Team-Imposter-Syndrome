// Utility function to upload an image to the database and S3 bucket.

import ReactS3 from 'react-s3';
import axios from "axios";

// Configuration for the S3 bucket - "ap-southeast-2" is the code for Asia Pacific (Australia) - accessKeyId and secretAccessKey are brought in from the .env file.
const config = {
    bucketName: "discussion-board",
    dirName: "photos",
    region: "ap-southeast-2",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
};

// file : File   : the file that is to be uploaded to the S3 bucket.
// type : String : the type of image to be uploaded - either "post" or "comment".
export default function upload(file, type) {
    return ReactS3.uploadFile(file, config)
        .then(data => {
            // alt_text is set to "default" as no functionality for alternate text is currently implemented.
            // user_id and status_id are default values as these ID's have not been confirmed yet.
            const post = {
                content: data.location,
                alt_text: "default",
                user_id: "12345678",
                status_id: "APPROVED"
            };

            // localhost:5000 is the local port for the database connection.
            axios.post("http://localhost:5000/" + type + "s/add/", post)
                .then(res => {
                    alert("Post uploaded successfully!");
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}