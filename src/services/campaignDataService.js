const getCampaigns = () => {
  return JSON.parse(localStorage.getItem("campaigns")) || [];
};

const saveCampaigns = (campaigns) => {
  localStorage.setItem("campaigns", JSON.stringify(campaigns));
};

export { getCampaigns, saveCampaigns };
