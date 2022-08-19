import ChatBoard from "./chatBoard";
import ChatInput from "./chatInput";
import { useSelector } from "react-redux";

const Chat = () => {
    const messages = useSelector((state) => state.messages);
    return (
        <>
            <section className="messCon">
                <ChatBoard messages={messages} />
                <ChatInput buttonTitle="Send" />
            </section>
        </>
    );
};

export default Chat;
