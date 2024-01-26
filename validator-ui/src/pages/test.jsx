import React from "react";

import { useSelector } from "react-redux";


export default function Test() {
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}


  