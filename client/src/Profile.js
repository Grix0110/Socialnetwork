import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import Uploader from "./uploader";


export default function Profile({ isPopupOpen, saveDraft, bio, firstName, lastName, picture, uploadPicture, togglePopup }) {
    return (
        <div id="profileComponent">
            <h1 id="usernameBig">
                {firstName} {lastName}
            </h1>
            <ProfilePic togglePopup={togglePopup} picture={picture} />
            {isPopupOpen && (
                <Uploader
                    firstName={firstName}
                    // lastName={this.state.lastName}
                    uploadPicture={uploadPicture}
                />
            )}
            <BioEditor saveDraft={saveDraft} bio={bio} />
        </div>
    );
}
