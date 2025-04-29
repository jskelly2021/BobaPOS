import axios from 'axios';

const HEADERS = {
    'x-rapidapi-host': process.env.RAPID_API_HOST,
    'x-rapidapi-key': process.env.RAPID_API_KEY
};

// Calls the external geo API and returns the countries
export const getCountries = async (req, res) => {
    const { namePrefix } = req.query;
    const fetchURL = `${process.env.GEO_URL}/countries?namePrefix=${namePrefix}`;

    try {
        const { data } = await axios.get(fetchURL, { headers: HEADERS });
        res.json(data);
    } catch (e) {
        console.error(`Failed to find country: ${e.message}`);
        res.status(500).json({ error: 'Failed to find country' });
    }
};

// Calls the external geo API and returns the regions
export const getRegions = async (req, res) => {
    const { countryCode, namePrefix } = req.query;
    const fetchURL = `${process.env.GEO_URL}/countries/${countryCode}/regions?namePrefix=${namePrefix}`;

    try {
        const { data } = await axios.get(fetchURL, { headers: HEADERS });
        res.json(data);
    } catch (e) {
        console.error(`Failed to find region: ${e.message}`);
        res.status(500).json({ error: 'Failed to find region' });
    }
};
