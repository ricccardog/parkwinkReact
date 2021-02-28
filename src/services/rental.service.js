import http from "../http-common";

class RentalDataService {
    getAll() {
        return http.get("/rentals");
    }

    get(_id) {
        return http.get(`/rentals/${_id}`)
            .then(response => {
                response.data.startDate = new Date(response.data.startDate).toLocaleDateString('en-Ca');
                response.data.endDate = new Date(response.data.endDate).toLocaleDateString('en-Ca');

                return response
            });
            
    }

    create(data) {
        return http.post("/rentals", data);
    }

    update(_id, data) {
        return http.put(`/rentals/${_id}`, data);
    }

    delete(_id) {
        return http.delete(`/rentals/${_id}`);
    }

    search(query) {        
        return http.get(`/rentals`, {params: query});
    }
}

export default new RentalDataService();