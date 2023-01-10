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
};
