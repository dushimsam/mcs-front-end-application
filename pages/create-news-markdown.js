import { useState } from "react";
import Yamde from "yamde";

import { exampleContent } from "./exampleContent";

export default function App() {
    const [isLightMode, setIsLightMode] = useState(true);
    const [text, setText] = useState(exampleContent);


    return (
        <div className="App">
            <div
                style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                }}
                onClick={() => setIsLightMode(!isLightMode)}
            >
                {`${isLightMode ? "Dark" : "Light"} Mode`}
            </div>

            <Yamde
                value={text}
                theme={isLightMode ? "light" : "dark"}
                handler={setText}
            />
        </div>
    );
}
