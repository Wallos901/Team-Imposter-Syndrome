// Utility function to download using routes.

import axios from "axios";

export async function getAll(type, query="") {
    return new Promise((resolve) => {
        axios.get("http://localhost:5000/api/" + type + query)
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