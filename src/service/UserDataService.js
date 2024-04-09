import axios from 'axios'

const USER_API_URL = 'http://localhost:8080'
const USER_API_URL2 = 'http://localhost:8090'

class UserDataService {

    retrieveGetDate() {
        return axios.get(`${USER_API_URL2}/date`);
    }

    retrieveAllUsers() {
        return axios.get(`${USER_API_URL}/customer`);
    }
    
    retrieveAllOrders() {
        return axios.get(`${USER_API_URL}/customer/orders`);
    }
    addOrder(id, user) {
        return axios.post(`${USER_API_URL}/customer/${id}/orders`, user);
    }

    retrieveOrder(id1, id2) {
        return axios.get(`${USER_API_URL}/customer/${id1}/orders/${id2}`);
    }

    retrieveUser(id) {
        return axios.get(`${USER_API_URL}/customer/${id}`);
    }
    updateOrder(id1,id2, user) {
        return axios.put(`${USER_API_URL}/customer/${id1}/orders/${id2}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${USER_API_URL}/customer/${id}`);
    }
    deleteOrder(id1, id2) {
        return axios.delete(`${USER_API_URL}/customer/${id1}/orders/${id2}`);
    }
    updateUser(id, user) {
        return axios.put(`${USER_API_URL}/customer/${id}`, user);
    }
    createUser(user) {
        return axios.post(`${USER_API_URL}/customer`, user);
    }
  }
export default new UserDataService()