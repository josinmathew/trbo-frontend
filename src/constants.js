const CampaignStatus = {
  ACTIVE: 1,
  DELETED: 0,
};

const CampaignType = {
  STANDARD: 0,
  AB_TEST: 1,
  MV_TEST: 2,
};

const CampaignStatusText = {
  [CampaignStatus.ACTIVE]: "aktiv",
  [CampaignStatus.DELETED]: "gelöscht",
};

const CampaignTypeText = {
  [CampaignType.STANDARD]: "Standard",
  [CampaignType.AB_TEST]: "AB Test",
  [CampaignType.MV_TEST]: "MV Test",
};

const SortDir = {
  ASC: "asc",
  DESC: "desc",
};

export {
  CampaignStatus,
  CampaignType,
  CampaignStatusText,
  CampaignTypeText,
  SortDir,
};
