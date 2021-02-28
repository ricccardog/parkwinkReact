import http from "../http-common";

class CustomerDataService {
    getAll() {
        return http.get("/customers");
    }

    get(_id) {
        return http.get(`/customers/${_id}`)
            .then(response => {
                response.data.creationDate = new Date(response.data.creationDate).toLocaleDateString('en-Ca');
                return response
            });
            
    }

    create(data) {
        return http.post("/customers", data);
    }

    update(_id, data) {
        return http.put(`/customers/${_id}`, data);
    }

    delete(_id) {
        return http.delete(`/customers/${_id}`);
    }

    search(query) {        
        return http.get(`/customers`, {params: query});
    }
}

export default new CustomerDataService();