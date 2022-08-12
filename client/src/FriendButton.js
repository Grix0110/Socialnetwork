import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function FriendButton() {
    const { id } = useParams();
    // const [button, setButton] = useState({
    //     text: "",
    //     url: "",
    // });

    useEffect(() => {
        fetch(`/friendship/${id}`)
            .then((result) => result.json())
            .then((data) => {
                console.log("friendship from database: ", data);
            })
            .catch((err) => {
                console.log("ERROR in fetch request FriendButton", err);
            });
    }, []);

    const changeButtonOnClick = () => {
        fetch(`/requestfriend`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Friendshiprequest: ", data);
            })
            .catch((err) => {
                console.log("error in changing friendship status", err);
            });
    };

    return (
        <>
            <button onClick={changeButtonOnClick}>send</button>
        </>
    );
}
