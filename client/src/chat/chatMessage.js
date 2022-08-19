import { Link } from "react-router-dom";

const ChatMessage = ({ message }) => {
    console.log("MESSAGE INFO: ", message);
    return (
        <>
            <div className="chatMessage">
                <div>
                    <Link to={`/user/${message.user_id}`}>
                        <img className="messPic" src={message.image_url}></img>
                    </Link>
                    <p className="messName">
                        {message.first_name} {message.last_name}
                    </p>
                </div>
                <p>
                    {message.message} on{" "}
                    {new Date(message.created_at).toString().slice(0, 24)}
                </p>
            </div>
        </>
    );
};

export default ChatMessage;
