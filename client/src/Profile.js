import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import Uploader from "./uploader";

export default function Profile({
    isPopupOpen,
    saveDraft,
    bio,
    firstName,
    lastName,
    picture,
    uploadPicture,
    togglePopup,
}) {
    return (
        <div id="profileComponent">
            <div className="bio">
                <h1 id="usernameBig">
                    {firstName} {lastName}
                </h1>
                <BioEditor saveDraft={saveDraft} bio={bio} />
            </div>
            <ProfilePic togglePopup={togglePopup} picture={picture} />
            {isPopupOpen && (
                <Uploader firstName={firstName} uploadPicture={uploadPicture} />
            )}
        </div>
    );
}
