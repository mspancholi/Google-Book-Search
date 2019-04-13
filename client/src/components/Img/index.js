import React from "react";

function Img(props) {
    return (
        <img src={props.image} alt={props.title} height="100" weight="100"></img>
    );

}

export default Img;