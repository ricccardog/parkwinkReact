import http from "../http-common";

class CarDataService {
    getAll() {
        return http.get("/cars");
    }

    get(_id) {
        return http.get(`/cars/${_id}`);
    }

    create(data) {
        return http.post("/cars", data);
    }

    update(_id, data) {
        return http.put(`/cars/${id}`, data);
    }

    delete(_id) {
        return http.delete(`/cars/${_id}`);
    }

    search(searchKey, searchValue) {
        return http.get('/cars' + '?' + searchKey + '=' + searchValue);
    }
}

export default new CarDataService();