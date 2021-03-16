class ServerApi {
    constructor() {
        this.systemName = "slnnzmtl";
        this.path = "http://158.101.166.74:8080/api/data/";
        this.baseURL = this.path + this.systemName;

        this.headers = {
            'Content-Type': 'application/json'
        }
    }

    async post(entity, data) {

        let body = JSON.stringify({
            data: JSON.stringify(data)
        });

         await fetch (`${this.baseURL}/${entity}`, {
            method: "POST",
            body,
            headers: this.headers
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    get(entity) {
        try {
            return fetch (`${this.baseURL}/${entity}`, {
                method: "GET",
                headers: this.headers
            })
        }
        catch(error) {
            console.error("Error: ", error);
        }
    }

    delete(entity, id) {
        return fetch (`${this.baseURL}/${entity}/${id}`, {
            method: "DELETE",
            headers: this.headers
        })
    }

    put(entity, id, data) {
        let body = JSON.stringify({
            data: JSON.stringify(data)
        });

        fetch (`${this.baseURL}/${entity}/${id}`, {
            method: "PUT",
            headers: this.headers,
            body
        })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export default ServerApi;