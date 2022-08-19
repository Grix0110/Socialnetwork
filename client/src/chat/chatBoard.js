import ChatMessage from "./chatMessage";

const ChatBoard = ({ messages }) => {
    return (
        <div className="chatBoard">
            {messages.map((message) => (
                <ChatMessage key={Math.random()} message={message} />
            ))}
        </div>
    );
};

export default ChatBoard;
