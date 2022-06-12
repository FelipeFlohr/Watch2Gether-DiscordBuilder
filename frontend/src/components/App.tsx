import React from "react";
import Controls from "./controls/Controls";
import Footer from "./footer/Footer";

function App() {
    return (
        <div className="w-screen h-screen bg-gradient-to-r from-stone-900 to-stone-800 text-white flex flex-col items-center justify-center">
            <Controls />
            <Footer />
        </div>
    )
}

export default App;
