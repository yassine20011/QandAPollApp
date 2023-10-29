import DynamicInput from "./dynamicInput";
import NavBar from "../navbar";
import { useState } from "react";

function Options() {

    const questions = JSON.parse(localStorage.getItem("questions") as string);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    return (<>

        <NavBar />
        
      
    </>);
}

export default Options;