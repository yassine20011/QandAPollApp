import NavBar from "./navbar.tsx";
import Questions from "./Q&A/questions.tsx";
import React from "react";


function ViewSession() {
    return (
        <React.Fragment>
            <NavBar />
            <Questions />
        </React.Fragment>

    );
}

export default ViewSession;