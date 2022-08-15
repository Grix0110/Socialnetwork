import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { acceptFriend, receiveFriendsAndWannabes } from "./redux/slice";

export default function FriendsAndWannabes() {
    const dispatch = useDispatch();

    const wannabes = useSelector((state) => {
        state.friends && state.friends.filter((friend) => !friend.accepted);
    });

    useEffect(() => {
        fetch("/friends")
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
                dispatch(receiveFriendsAndWannabes(data));
            })
            .catch((err) =>
                console.log("ERROR in handle ACCEPT FRIENDS: ", err)
            );
    }, []);

    //const friends = ...

    const handleAccept = (id) => {
        fetch("/acceptfriend")
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) =>
                console.log("ERROR in handle ACCEPT FRIENDS: ", err)
            );
        // 1. fetch POST to update Server
        // 2. make sure update was successful
        // 3. prepare the action for our reducer
        // 4. dispatch data to reducer

        const action = acceptFriend(id);
        dispatch(action);
    };

    return (
        <div>
            <h2>Wannabes</h2>
            {wannabes.map((wannabe) => {
                return (
                    <div key={wannabe.id}>
                        <p>info about the friend</p>
                        <button
                            onClick={() => {
                                handleAccept(wannabe.id);
                            }}
                        ></button>
                    </div>
                );
            })}
        </div>
    );
}
