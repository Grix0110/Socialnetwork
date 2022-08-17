// import React from "react";

export default function ProfilePic({
    // firstName,
    // lastName,
    picture,
    togglePopup,
}) {
    return (
        <img
            className="profilePic"
            onClick={togglePopup}
            src={
                picture ||
                "../png-transparent-social-media-icons-avatar-user-profile-login-black-circle-silhouette-symbol.png"
            }
            alt="profilePic"
        ></img>
    );
}
