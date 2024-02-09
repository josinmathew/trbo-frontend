import React, { useState, useEffect } from "react";
import { CampaignStatus, CampaignType, CampaignTypeText } from "../constants";

const initialCampaign = {
  campaign_id: 0,
  campaign_name: "",
  campaign_type: CampaignType.STANDARD,
  campaign_start_time: "",
  campaign_end_time: "",
  campaign_status_id: CampaignStatus.ACTIVE,
};

const CampaignForm = ({ campaign, onSave, onCancel }) => {
  const [campaignData, setCampaignData] = useState(initialCampaign);
  const [error, setError] = useState("");

  useEffect(() => {
    if (campaign) {
      setCampaignData({
        campaign_id: campaign.campaign_id,
        campaign_name: campaign.campaign_name,
        campaign_type: campaign.campaign_type,
        campaign_start_time: campaign.campaign_start_time,
        campaign_end_time: campaign.campaign_end_time,
      });
    }
  }, [campaign]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { campaign_start_time, campaign_end_time } = campaignData;

    if (campaign_start_time && campaign_end_time) {
      const startDate = new Date(campaign_start_time);
      const endDate = new Date(campaign_end_time);
      if (endDate < startDate) {
        setError("End date cannot be earlier than start date");
        return;
      }
    }

    setError("");

    onSave(campaignData);
    setCampaignData(initialCampaign);
  };

  return (
    <form className="campaignform container1" onSubmit={handleSubmit}>
      <h3>{campaign ? "Edit" : "Add"} Campaign</h3>
      <div className="form-group">
        <label>Campaign Name</label>
        <input
          type="text"
          name="campaign_name"
          value={campaignData.campaign_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Campaign Type</label>
        <select
          name="campaign_type"
          value={campaignData.campaign_type}
          onChange={handleChange}
        >
          {Object.keys(CampaignTypeText).map((key) => (
            <option key={key} value={key}>
              {CampaignTypeText[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Campaign Start Date</label>
        <input
          type="date"
          name="campaign_start_time"
          value={campaignData.campaign_start_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Campaign End Date</label>
        <input
          type="date"
          name="campaign_end_time"
          value={campaignData.campaign_end_time}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="btn-group">
        <button className="btn save-btn" type="submit">
          Save
        </button>
        <button className="btn cancel-btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
