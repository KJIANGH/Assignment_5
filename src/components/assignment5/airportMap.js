import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props){
    const {width, height, countries, airports, routes, selectedAirline} = props;
    //TODO: 
    // 1.Define a projection which is geoMercator; 
    // set .scale(97), and .translate([width/2, height/2+20]); 
    // 2. Define a path generator using geoPath();
    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 

    const projection = geoMercator().scale(97).translate([width/2, height/2+20]);   
    const pathGenerator = geoPath().projection(projection);
    
    return <g>
        {countries.features.map(feature => (
            <path key={feature.properties.name} d={pathGenerator(feature)} fill="#eee" stroke="#ccc" strokeWidth={1}/> ))}
        {airports.map(airport => {
            const [x, y] = projection([airport.Longitude, airport.Latitude]);
            return (<circle key={airport.AirportID} cx={x} cy={y} r={1} fill="#2a5599"/>);})}
        {selectedAirline && (<Routes projection={projection} routes={routes} selectedAirline={selectedAirline}/>)}
    </g>


}

export { AirportMap }