import { Op } from "sequelize";
import Identity from "../models/identity.model.js";
// database connection
import Sequelize from "../database/connection.js";

export const addIdentityData = async (req, res) => {
  try {
    const { company, category } = req.body;

    // Check if a record with the same company and category exists
    const existingIdentity = await Identity.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("company")),
            company.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("category")),
            category.toLowerCase()
          ),
        ],
      },
    });

    if (existingIdentity) {
      return res.status(409).json("Already exists!");
    }

    // Create new identity record
    const newIdentity = await Identity.create({
      company: company,
      category: category,
    });

    if (newIdentity) {
      return res.status(200).json("Added new identity!");
    }

    return res.status(400).json("Something went wrong!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getAllIdentitiesData = async (req, res) => {
  try {
    // Fetch all identities and group by category
    const identities = await Identity.findAll({
      attributes: ["category", "company"],
      group: ["category", "company"],
      order: [
        ["category", "ASC"],
        ["company", "ASC"],
      ],
    });

    // Organize the identities by category
    const groupedIdentities = identities.reduce((result, identity) => {
      const { category, company } = identity;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(company);
      return result;
    }, {});

    return res.status(200).json(groupedIdentities);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};
