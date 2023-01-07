import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";

const Input: React.FC = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState("");

    const handleSend = () => {};
    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <GrAttachment />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target?.files[0])}
                />
                <label htmlFor="file">{/* <img src={Img} alt="" /> */}</label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
