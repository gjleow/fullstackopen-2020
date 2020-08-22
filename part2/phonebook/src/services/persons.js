import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export default { getAll, create, deletePerson, update };
