import React, { useState, useEffect } from "react";

import {
  CampaignStatus,
  CampaignStatusText,
  CampaignTypeText,
  SortDir,
} from "../constants";

const CampaignTable = ({ campaigns, onEdit, onDelete, onActivate, onSort }) => {
  const [sortOption, setSortOption] = useState({});

  useEffect(() => {
    onSort(sortOption);
  }, [sortOption]);

  const handleSort = (column) => {
    setSortOption({ column, direction: getDirection(column) });
  };

  const getDirection = (column) => {
    return sortOption.column === column
      ? sortOption.direction === SortDir.ASC
        ? SortDir.DESC
        : SortDir.ASC
      : SortDir.ASC;
  };

  const renderSortingIcon = (column) => {
    if (sortOption.column === column) {
      return sortOption.direction === SortDir.ASC ? (
        <i className="fas fa-sort-up"></i>
      ) : (
        <i className="fas fa-sort-down"></i>
      );
    }
    return <i className="fas fa-sort"></i>;
  };

  return (
    <table id="campaigntable">
      <thead>
        <tr>
          <th onClick={() => handleSort("campaign_name")}>
            Name {renderSortingIcon("campaign_name")}
          </th>
          <th onClick={() => handleSort("campaign_type")}>
            Type {renderSortingIcon("campaign_type")}
          </th>
          <th onClick={() => handleSort("campaign_start_time")}>
            Start Date {renderSortingIcon("campaign_start_time")}
          </th>
          <th onClick={() => handleSort("campaign_end_time")}>
            End Date {renderSortingIcon("campaign_end_time")}
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((campaign) => (
          <tr key={campaign.campaign_id}>
            <td>{campaign.campaign_name}</td>
            <td>{CampaignTypeText[campaign.campaign_type]}</td>
            <td>{campaign.campaign_start_time}</td>
            <td>{campaign.campaign_end_time}</td>
            <td>{CampaignStatusText[campaign.campaign_status_id]}</td>
            <td>
              <button
                className="btn edit-btn tooltip"
                onClick={() => onEdit(campaign)}
              >
                <i className="fas fa-pen"></i>
                <span className="tooltiptext">Edit Campaign</span>
              </button>
              {campaign.campaign_status_id === CampaignStatus.ACTIVE ? (
                <button
                  className="btn del-btn tooltip"
                  onClick={() => onDelete(campaign, CampaignStatus.DELETED)}
                >
                  <i className="fas fa-trash"></i>
                  <span className="tooltiptext">Delete Campaign</span>
                </button>
              ) : (
                <button
                  className="btn act-btn tooltip"
                  onClick={() => onActivate(campaign, CampaignStatus.ACTIVE)}
                >
                  <i className="fas fa-check"></i>
                  <span className="tooltiptext">Activate Campaign</span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CampaignTable;
