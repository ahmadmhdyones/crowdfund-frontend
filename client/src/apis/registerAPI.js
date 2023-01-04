import { api } from "./configs/axiosConfigs";

export const RegisterAPI = {
  register: async function ({ name, email, password }) {
    console.log(name, email, password);
    const response = await api.request({
      url: `api/users`,
      method: "POST",
      data: { name, email, password },
    });
    return response;
  },
};
