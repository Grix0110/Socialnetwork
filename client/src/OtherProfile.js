import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FriendButton from "./FriendButton";
import Friendsprofile from "./Friendsprofile";

export default function OtherProfile() {
    const { id } = useParams();
    const [otherProfile, setOtherProfile] = useState([]);
    const [isMyFriend, setIsMyFriend] = useState(false);

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

    useEffect(() => {
        fetch(`/friendship/${id}`)
            .then((result) => result.json())
            .then((data) => {
                setIsMyFriend(data[0].accepted);
            })
            .catch((err) => console.log("ERROR in find Friendship: ", err));
    });

    return (
        <>
            <div id="profileComponent">
                <img
                    className="profilePic"
                    src={
                        otherProfile.image_url ||
                        "./png-transparent-social-media-icons-avatar-user-profile-login-black-circle-silhouette-symbol.png"
                    }
                    alt="profilePic"
                ></img>
                <h1 id="usernameBig">
                    {otherProfile.first_name} {otherProfile.last_name}
                </h1>
            </div>
            <div className="messageCon">
                <div className="bio">
                    <h3 className="bioRender">{otherProfile.bio}</h3>
                    <FriendButton />
                </div>
            </div>
            {isMyFriend ? (
                <div className="chatCon">
                    <Friendsprofile />
                </div>
            ) : (
                <div className="chatCon"></div>
            )}
        </>
    );
}
