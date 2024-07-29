import Party from "../models/party.model.js";
import { getPartiesData } from "../utils/party.js";

export const getAllParties = async (req, res) => {
  try {
    const parties = await getPartiesData();

    const formattedPartyName = parties?.map((item) => {
      return {
        id: item.party_id,
        name: item.party_name,
        shopName: item.shop_name,
        contact: item.contact,
        label: "Pending Payment -",
        value: `Rs 0`,
      };
    });

    return res.status(200).json(formattedPartyName);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const addParty = async (req, res) => {
  try {
    const requestData = req.body;

    const newParty = await Party.create(requestData);

    if (newParty) return res.status(200).json("Added new party!");

    return res.status(400).json("Something went wrong!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
