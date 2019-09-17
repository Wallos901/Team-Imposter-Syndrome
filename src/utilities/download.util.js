// Utility function to download to the database and S3 bucket.

import axios from "axios";

// Configuration for the S3 bucket - "ap-southeast-2" is the code for Asia Pacific (Australia) - accessKeyId and secretAccessKey are brought in from the .env file.
const config = {
    bucketName: "discussion-board",
    dirName: "photos",
    region: "ap-southeast-2",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
};

export async function getAll(type) {
    return new Promise((resolve) => {
        axios.get("http://localhost:5000/api/" + type)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                alert(error);
                resolve(error);
            })
            .finally(() => {
                console.log('Loaded all ' + type);
            });
    });
}