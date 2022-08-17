import ChatBoard from "./chatBoard";
import ChatInput from "./chatInput";
import { useSelector } from "react-redux";

const Chat = () => {
    const messages = useSelector((state) => state.messages);
    return (
        <>
            <h1>Chat</h1>
            <ChatBoard messages={messages} />
            <ChatInput buttonTitle="Senden" />
        </>
    );
};

export default Chat;