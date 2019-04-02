require('dotenv').config();

module.exports = {
    apiKey: process.env.SENDGRID_API_KEY || null,
};