import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const HeartButton = ({like, onClick}) => {
    return (
        <FontAwesomeIcon icon={ like ? faHeartSolid : faHeart} onClick={onClick} size="2x" />
    );
};

export default HeartButton;