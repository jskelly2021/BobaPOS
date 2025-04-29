import axios from 'axios';

const geoURL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/';
const HEADERS = {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '59af24ee95msh7d2a1ea9aa2e8c1p17da2djsn171189092128'
};

// Calls the external geo API and returns the countries
export const getCountries = async (req, res) => {
    const { namePrefix } = req.query;
    const fetchURL = `${geoURL}countries?namePrefix=${namePrefix}`;

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
    const fetchURL = `${geoURL}countries/${countryCode}/regions?namePrefix=${namePrefix}`;

    try {
        const { data } = await axios.get(fetchURL, { headers: HEADERS });
        res.json(data);
    } catch (e) {
        console.error(`Failed to find region: ${e.message}`);
        res.status(500).json({ error: 'Failed to find region' });
    }
};
