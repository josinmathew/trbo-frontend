import "./CampaignManagement.css";
import React, { useState, useEffect } from "react";
import CampaignTable from "./CampaignTable";
import CampaignForm from "./CampaignForm";
import { CampaignStatus, CampaignTypeText, SortDir } from "../constants";
import { getCampaigns, saveCampaigns } from "../services/campaignDataService";

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedCampaigns = getCampaigns();
    if (savedCampaigns) {
      setCampaigns(savedCampaigns);
      setFilteredCampaigns(savedCampaigns);
    }
  }, []);

  const showLoader = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsLoading(false);
  };

  const handleSaveCampaign = async (campaign) => {
    let updatedCampaigns = [];
    if (campaign.campaign_id) {
      updatedCampaigns = campaigns.map((item) => {
        if (item.campaign_id === campaign.campaign_id) {
          return { ...item, ...campaign };
        }
        return item;
      });
    } else {
      campaign.campaign_id = campaign.campaign_id || campaigns.length + 1;
      updatedCampaigns = [...campaigns, campaign];
    }

    setShowModal(false);

    await showLoader();
    setMessage(`Date saved successfully.`);

    setCampaigns(updatedCampaigns);
    setFilteredCampaigns(updatedCampaigns);
    saveCampaigns(updatedCampaigns);
  };

  const handleAddEditCampaign = (campaignToEdit = null) => {
    setCampaignToEdit(campaignToEdit);
    setShowModal(true);
  };

  const handleStatusCampaign = async (campaignToActivate, status) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign === campaignToActivate) {
        return { ...campaign, campaign_status_id: status };
      }
      return campaign;
    });

    await showLoader();
    setMessage(
      `${
        status == CampaignStatus.CampaignStatus ? "Activated" : "Deleted "
      } successfully.`
    );
    setCampaigns(updatedCampaigns);
    setFilteredCampaigns(updatedCampaigns);
    saveCampaigns(updatedCampaigns);
  };

  const handleSort = ({ column, direction }) => {
    let sortedCampaigns = [...campaigns];
    sortedCampaigns.sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === SortDir.ASC ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === SortDir.ASC ? 1 : -1;
      }
      return 0;
    });

    setCampaigns(sortedCampaigns);
    setFilteredCampaigns(sortedCampaigns);
  };

  const handleFilter = (event) => {
    const { name, value } = event.target;
    const filtered = campaigns.filter((campaign) => {
      if (
        name === "campaign_start_time" ||
        name === "campaign_end_time" ||
        name === "campaign_type"
      ) {
        return campaign[name] == value;
      } else {
        return campaign[name].toLowerCase().includes(value.toLowerCase());
      }
    });
    setFilteredCampaigns(filtered);
  };

  return (
    <div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader-wrapper">
            <div className="loader"></div>
            <div className="text">Please wait...</div>
          </div>
        </div>
      )}
      <button className="create-btn" onClick={() => handleAddEditCampaign()}>
        Create New Campaign
      </button>
      <div className="formWrapper">
        <form className="container">
          <label>Filter: </label>
          <input
            type="text"
            name="campaign_name"
            placeholder="Filter by Name"
            onChange={handleFilter}
          />
          <select name="campaign_type" onChange={handleFilter}>
            <option value="">Filter by Type</option>
            {Object.keys(CampaignTypeText).map((key) => (
              <option key={key} value={key}>
                {CampaignTypeText[key]}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="campaign_start_time"
            onChange={handleFilter}
          />
          <input type="date" name="campaign_end_time" onChange={handleFilter} />
        </form>
      </div>

      {message && (
        <div className="message">
          {message}{" "}
          <span className="close" onClick={() => setMessage("")}>
            &times;
          </span>
        </div>
      )}

      <CampaignTable
        campaigns={filteredCampaigns}
        onEdit={handleAddEditCampaign}
        onDelete={handleStatusCampaign}
        onActivate={handleStatusCampaign}
        onSort={handleSort}
      />

      {showModal && (
        <div className={showModal ? "modal active" : "modal"}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <CampaignForm
              campaign={showModal ? campaignToEdit : null}
              onSave={handleSaveCampaign}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;
