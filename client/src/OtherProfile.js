import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FriendButton from "./FriendButton";

export default function OtherProfile() {
    const { id } = useParams();
    const [otherProfile, setOtherProfile] = useState([]);

    useEffect(() => {
        fetch(`/otheruser/${id}`)
            .then((result) => result.json())
            .then((data) => {
                setOtherProfile(data);
            })
            .catch((err) => {
                console.log("ERROR in fetch other Profile: ", err);
            });
    }, [id]);

    return (
        <>
            <div id="profileComponent">
                <div className="bio">
                    <h1 id="usernameBig">
                        {otherProfile.first_name} {otherProfile.last_name}
                    </h1>
                    <h3 className="bioRender">{otherProfile.bio}</h3>
                </div>
                <img
                    className="profilePic"
                    src={
                        otherProfile.image_url ||
                        "./png-transparent-social-media-icons-avatar-user-profile-login-black-circle-silhouette-symbol.png"
                    }
                    alt="profilePic"
                ></img>
                <FriendButton />
            </div>
        </>
    );
}
