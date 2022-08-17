import { useRef } from "react";
import { socket } from "../socket";

const ChatInput = ({
    buttonTitle = "Send",
    textPlaceholder = "Write a message",
}) => {
    const textareaRef = useRef();

    const sendMessage = () => {
        const message = textareaRef.current.value;
        socket.emit("new-message", {
            username: "username",
            text: message,
        });

        textareaRef.current.value = "";
        textareaRef.current.focus();
    };

    const onChange = (e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            sendMessage();
        }
    };

    return (
        <div className="chatInput">
            <textarea
                ref={textareaRef}
                placeholder={textPlaceholder}
                onKeyUp={onChange}
            ></textarea>
            <button onClick={sendMessage}>{buttonTitle}</button>
        </div>
    );
};

export default ChatInput;
