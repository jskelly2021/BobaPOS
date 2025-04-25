import axios from 'axios';

const baseURL = 'http://api.openweathermap.org';
const API_key = '6f3b84c2ab3f7906cb3d0624c8163276';

const geoURL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/';
const HEADERS = {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '59af24ee95msh7d2a1ea9aa2e8c1p17da2djsn171189092128'
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchWeather = async (cityName, stateCode, countryCode) => {
    const fetchURL = `${baseURL}/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${API_key}&units=imperial`;

    try {
        const { data } = await axios.get(fetchURL);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch weather: ${e.message}`);
    }
}

export const findCountries = async (namePrefix) => {
    const fetchURL = `${geoURL}countries?namePrefix=${namePrefix}`;

    try {
        const { data } = await axios.get(fetchURL, {headers: HEADERS});
        return data;
    }
    catch (e) {
        throw new Error(`Failed to find country: ${e.message}`);
    }
}

export const findRegions = async (countryCode, namePrefix) => {
    const fetchURL = `${geoURL}countries/${countryCode}/regions?namePrefix=${namePrefix}`

    try {
        const { data } = await axios.get(fetchURL, {headers: HEADERS});
        return data;
    }
    catch (e) {
        throw new Error(`Failed to find region: ${e.message}`);
    }
}

export const updateLocation = async (country_name, country_code, region_name, region_code, city_name) => {
    const updateURL = `${API_BASE_URL}/weather/`;

    try {
        const data = await axios.put(updateURL, {
                     country_name: country_name,
                     country_code: country_code,
                     region_name: region_name,
                     region_code: region_code,
                     city_name: city_name
        }, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to update location ${e.message}`);
    }
}
