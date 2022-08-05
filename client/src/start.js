import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    });
// .catch(() => {
//     ReactDOM.render(<Welcome />, document.querySelector("main"));
// });
