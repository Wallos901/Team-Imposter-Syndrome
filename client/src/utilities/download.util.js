// Utility function to download using routes.

import axios from "axios";

export async function getAll(type, query="") {
    return new Promise((resolve) => {
        axios.get("/api/" + type + query)
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