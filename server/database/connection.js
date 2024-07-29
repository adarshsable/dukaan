import "dotenv/config";
import { Sequelize } from "sequelize";

// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully. ✅");
  } catch (error) {
    console.error("Unable to connect to the database: ❌", error);
  }
}

testConnection();

export default sequelize;
