import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline} = props;
    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    // 2. define the xScale and yScale
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>
    const getColor = (selectedAirline, AirlineID) => {
        return selectedAirline&&AirlineID===selectedAirline ? "#992a5b" : "#2a5599";}

    const maxCount = max(data, d => d.Count);
    const xScale = scaleLinear()
        .domain([0, Math.max(maxCount, 2500)])
        .range([0, width]);
    
    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName))
        .range([0, height])
        .padding(0.2);
    
    const bars = data.map(d => (
        <rect key={d.AirlineID} x={0} y={yScale(d.AirlineName)}
        width={xScale(d.Count)} height={yScale.bandwidth()} fill={getColor(selectedAirline, d.AirlineID)}
        stroke="black" 
        strokeWidth={1} 
        onMouseOver={() => setSelectedAirline(d.AirlineID)}
        onMouseOut={()=> setSelectedAirline(null)}
        />
    ));
    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input. 
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    
    
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        <rect width={1.65*width} height={1.15*height} fill="none" stroke="black" strokeWidth={1} transform={`translate(${-offsetX}, ${-8})`}/>
        {bars}
            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
    </g>
}