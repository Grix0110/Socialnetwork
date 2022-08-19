import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function FriendButton() {
    const { id } = useParams();
    const [button, setButton] = useState({
        text: "send",
        url: "/otherpeople",
    });

    const buttonState = (data) => {
        let button = {};
        // console.log("DATA BUTTON: ", data[0]);
        if (data[0] == undefined) {
            button.text = "Send request";
            button.url = "/requestfriend";
        } else if (data[0].isMyRequest && !data[0].accepted) {
            button.text = "Accept request";
            button.url = "/acceptfriend";
        } else if (!data[0].accepted && !data[0].isMyRequest) {
            button.text = "Revoke request";
            button.url = "/unfriend";
        } else if (data[0].accepted) {
            button.text = "Unfriend";
            button.url = "/unfriend";
        }
        // console.log("BUTTON: ", button);
        return button;
    };

    useEffect(() => {
        fetch(`/friendship/${id}`)
            .then((result) => result.json())
            .then((data) => {
                let changeButton = buttonState(data);
                setButton(changeButton);
            })
            .catch((err) => {
                console.log("ERROR in fetch request FriendButton", err);
            });
    }, []);

    const changeButtonOnClick = (url) => {
        console.log("URL FROM FRIEND BUTTON: ", url);
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((result) => result.json())
            .then((data) => {
                let changeButton = buttonState(data);
                setButton(changeButton);
            })
            .catch((err) => {
                console.log("error in changing friendship status", err);
            });
    };

    return (
        <>
            <button onClick={() => changeButtonOnClick(button.url)}>
                {button.text}
            </button>
        </>
    );
}
