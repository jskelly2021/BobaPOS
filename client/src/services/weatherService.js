import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchWeather = async (cityName, stateCode, countryCode) => {
    const fetchURL = `${API_BASE_URL}/weather?cityName=${cityName}&stateCode=${stateCode}&countryCode=${countryCode}`;

    try {
        const { data } = await axios.get(fetchURL, { withCredentials: true });
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch weather: ${e.message}`);
    }
}

export const findCountries = async (namePrefix) => {
    const url = `${API_BASE_URL}/geo/countries?namePrefix=${namePrefix}`;

    try {
        const { data } = await axios.get(url, { withCredentials: true });
        return data;
    }
    catch (e) {
        throw new Error(`Failed to find country: ${e.message}`);
    }
}

export const findRegions = async (countryCode, namePrefix) => {
    const url = `${API_BASE_URL}/geo/regions?countryCode=${countryCode}&namePrefix=${namePrefix}`;

    try {
        const { data } = await axios.get(url, { withCredentials: true });
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

export const fetchCountryCode = async () => {
    const fetchURL = `${API_BASE_URL}/weather/country`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data[0].country_code;
    } catch (e) {
        throw new Error(`Failed to fetch database country code: ${e.message}`);
    }
}

export const fetchRegionCode = async () => {
    const fetchURL = `${API_BASE_URL}/weather/region`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data[0].region_code;
    } catch (e) {
        throw new Error(`Failed to fetch database region code: ${e.message}`);
    }
}

export const fetchCityName = async () => {
    const fetchURL = `${API_BASE_URL}/weather/city`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data[0].city_name;
    } catch (e) {
        throw new Error(`Failed to fetch database city name: ${e.message}`);
    }
}

export const fetchRegionName = async () => {
    const fetchURL = `${API_BASE_URL}/weather/regionName`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data[0].region_name;
    } catch (e) {
        throw new Error(`Failed to fetch database city name: ${e.message}`);
    }
}

export const fetchCountryName = async () => {
    const fetchURL = `${API_BASE_URL}/weather/countryName`;

    try {
        const { data } = await axios.get(fetchURL, {withCredentials: true});
        return data[0].country_name;
    } catch (e) {
        throw new Error(`Failed to fetch database city name: ${e.message}`);
    }
}
