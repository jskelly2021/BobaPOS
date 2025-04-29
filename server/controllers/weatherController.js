import pool from '../config/database.js';
import axios from 'axios';

// Calls the external weather API and returns the weather
export const getWeather = async (req, res) => {
    const { cityName, stateCode, countryCode } = req.query;
    const API_key = process.env.WEATHER_API_KEY;

    const weatherURL = `${process.env.WEATHER_URL}/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${API_key}&units=imperial`;

    try {
        const response = await axios.get(weatherURL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

// Update weather location
export const updateWeatherLocation = async (req, res) => {
    const { country_name, country_code, region_name, region_code, city_name } = req.body;
    try {
        const result = await pool.query(
            `UPDATE weather_location 
             SET country_name=$1, country_code=$2, region_name=$3, region_code=$4, city_name=$5
             RETURNING *`,
            [country_name,country_code,region_name,region_code,city_name]
        );        
        res.status(200).json(result.rows);
        // console.log(`Updating weather location:
        //              Country Name: ${country_name},
        //              Country Code: ${country_code},
        //              Region Name: ${region_name},
        //              Region Code: ${region_code},
        //              City Name: ${city_name}`);
    } catch (err) {
        console.error('Error updateWeatherLocation', err);
        res.status(500).json("Location not found");
    }
}

export const getCountryCode = async (req, res) => {
    try {
        const result = await pool.query('SELECT country_code FROM weather_location');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getCountryCode', err);
        res.status(500).json("Server Error" );
    }
}

export const getRegionCode = async (req, res) => {
    try {
        const result = await pool.query('SELECT region_code FROM weather_location');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getRegionCode', err);
        res.status(500).json("Server Error" );
    }
}

export const getCityName = async (req, res) => {
    try {
        const result = await pool.query('SELECT city_name FROM weather_location');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getCityName', err);
        res.status(500).json("Server Error" );
    }
}

export const getCountryName = async (req, res) => {
    try {
        const result = await pool.query('SELECT country_name FROM weather_location');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getCountryName', err);
        res.status(500).json("Server Error" );
    }
}

export const getRegionName = async (req, res) => {
    try {
        const result = await pool.query('SELECT region_name FROM weather_location');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getRegionName', err);
        res.status(500).json("Server Error" );
    }
}
