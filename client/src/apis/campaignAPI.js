import axios from "axios";
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
  getAll: async function () {
    const response = await api.request({
      url: `api/campaigns/deployed`,
      method: "GET",
    });
    return response.data.data.campaigns;
  },
  getOne: async function (id) {
    const response = await api.request({
      url: `api/campaigns/deployed/${id}`,
      method: "GET",
    });
    return response.data.data.campaign;
  },
};
