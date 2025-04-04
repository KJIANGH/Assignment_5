import React from "react";

function Routes(props){
    const {projection, routes, selectedAirline} = props;
    // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.

    const selectedRoutes = routes.filter(routes => routes.AirlineID === selectedAirline);

    
    if (selectedAirline===null) {
        return <g></g>} 

    return ( <g>
            {selectedRoutes.map(route => {
                const source = projection([route.SourceLongitude, route.SourceLatitude]);
                const dest = projection([route.DestLongitude, route.DestLatitude]);

                return (
                    <line key={route.AirlineID} x1={source[0]} y1={source[1]} x2={dest[0]} y2={dest[1]}
                    stroke="#992a5b" strokeWidth={0.5} opacity={0.5}/>);
            })} </g> );
}
    

export { Routes }