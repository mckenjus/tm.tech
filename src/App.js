import React from "react";
import Header from "./components/Header";
import HomePage from "./HomePage";
import Qbcompare from "./Qbs";



function App () {
    function getPage () {
        const route = window.location.pathname;
        if (route === "/Qbs") return <Qbcompare/>
        return <HomePage />;
    }
    return (
        <div className="container-fluid">
    <Header />
    { getPage() }
    </div>
        )
}

export default App;
