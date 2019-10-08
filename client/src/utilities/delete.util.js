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

export default function deletePost(postID) {
    console.log(postID);
    return axios.delete("/api/posts/" + postID)
        .then(post => {
            console.log(post.data);
            const file = post.data.imageURL.split("/");
            const fileName = file[-1];
            ReactS3.deleteFile(fileName, config)
                .catch(err => console.log(err));
        }).catch(err => console.log(err));
}