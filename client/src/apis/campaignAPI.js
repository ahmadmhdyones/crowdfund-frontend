import { api } from "./configs/axiosConfigs";

export const CampaignAPI = {
  create: async function ({
    title,
    description,
    image,
    target,
    deadline,
    min,
  }) {
    const response = await api.request({
      url: `api/campaigns`,
      method: "POST",
      data: {
        title,
        description,
        image,
        goal: target,
        endAt: deadline,
        minPledge: min,
      },
    });
    return response;
  },
  getAllDeployed: async function () {
    const response = await api.request({
      url: `api/campaigns/deployed`,
      method: "GET",
    });
    return response.data.data.campaigns;
  },
  getOneDeployed: async function (id) {
    const response = await api.request({
      url: `api/campaigns/deployed/${id}`,
      method: "GET",
    });
    return response.data.data.campaign;
  },
  getMyCampaigns: async function (token) {
    const response = await api.request({
      url: `api/campaigns/mine`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.campaigns;
  },
};
