import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject);
  console.log(request);
  return request.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};
const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};
const personService = {
  getAll,
  create,
  update,
  remove,
};

export default personService;
