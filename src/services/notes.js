import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject);
  return request.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

const noteService = {
  getAll,
  create,
  update,
};

export default noteService;
