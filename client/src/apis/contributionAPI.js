import { api } from "./configs/axiosConfigs";

export const ContributionAPI = {
  fund: async function ({ campaignId, amount }) {
    const response = await api.request({
      url: `api/contributions/fund`,
      method: "POST",
      data: { campaignId: "63b426fcd608deabe940c2cd", amount },
    });
    return response;
  },
  getAll: async function (token) {
    const response = await api.request({
      url: `api/contributions/mine`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.contributions;
  },
};
