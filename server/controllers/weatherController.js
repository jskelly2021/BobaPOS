import pool from '../config/database.js';

//Update weather location
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
        console.log(`Updating weather location:
                     Country Name: ${country_name},
                     Country Code: ${country_code},
                     Region Name: ${region_name},
                     Region Code: ${region_code},
                     City Name: ${city_name}`);
    } catch (err) {
        console.error('Error updateWeatherLocation', err);
        res.status(500).json("Location not found");
    }
}
