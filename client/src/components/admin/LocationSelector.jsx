import React, { useState, useEffect } from 'react';
import { findCountries, findRegions, updateLocation, fetchCountryName, fetchRegionName, fetchCityName } from '../../services/weatherService';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LocationSelector = () => {
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    
    const [regionName, setRegionName] = useState('');
    const [regionCode, setRegionCode] = useState('');

    const [cityName, setCityName] = useState('');

    useEffect(() => {
        const preloadLocation = async() => {
            try {
                const currentCountry = await fetchCountryName();
                const currentRegion = await fetchRegionName();
                const currentCity = await fetchCityName();

                setCountryName(currentCountry || '');
                setRegionName(currentRegion || '');
                setCityName(currentCity || '');
            }
            catch (e) {
                throw new Error(`Failed to preload current location ${e.message}`);
            }
        };

        preloadLocation();
    }, []);

    const saveCodes = async () => {
        try {
            const countryData = await findCountries(countryName);
            const countryFound = countryData.data.find(
                (c) => c.name.toLowerCase() === countryName.trim().toLowerCase()
            );
            
            if (!countryFound) {
                alert(`No match for input country (${countryName})`);
                return;
            }

            setCountryCode(countryFound.code);

            await sleep(2000);
            const regionData = await findRegions(countryFound.code, regionName);
            const regionFound = regionData.data.find(
                (c) => c.name.toLowerCase() === regionName.trim().toLowerCase()
            );

            if (!regionFound) {
                alert(`No match for input region (${regionName})`);
                return;
            }

            setRegionCode(regionFound.isoCode);

            const locationDetails = await updateLocation(countryFound.name, 
                                                         countryFound.code, 
                                                         regionFound.name, 
                                                         regionFound.isoCode,
                                                         cityName);

            await sleep(2000);

        }
        catch (e) {
            throw new Error(`Failed to update location in selector ${e.message}`);
        }
    };

    return (
        <div className='locationSelector'>
            <h1 className='title'>Set Location for Weather Services</h1>

            <div className='Inputs'>
                <input
                type='text'
                className='countryInput'
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder='Country Name'
                />

                <input
                type='text'
                className='regionInput'
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
                placeholder='Region Name'
                />

                <input
                type='text'
                className='cityInput'
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder='City Name'
                />

                <button className='locationSave' onClick={() => saveCodes()}>
                    Save
                </button>
            </div>
        </div>

    );
}

export default LocationSelector;
