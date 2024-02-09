import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CampaignManagement from "./index";
import { getCampaigns } from "../services/campaignDataService";

jest.mock("../services/campaignDataService", () => ({
  getCampaigns: jest.fn(),
}));

describe("CampaignManagement", () => {
  beforeEach(() => {
    getCampaigns.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<CampaignManagement />);
  });

  test("loads campaigns on mount", async () => {
    getCampaigns.mockReturnValueOnce([
      { campaign_id: 1, campaign_name: "Test Campaign" },
    ]);
    render(<CampaignManagement />);

    await waitFor(() => expect(getCampaigns).toHaveBeenCalledTimes(1));
  });

  test("adds new campaign", async () => {
    const { getByText } = render(<CampaignManagement />);

    fireEvent.click(getByText("Create New Campaign"));

    await waitFor(() => expect(getByText("Save")).toBeInTheDocument());
  });
});
