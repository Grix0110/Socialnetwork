import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    acceptFriend,
    receiveFriendsAndWannabes,
    unfriendFriend,
} from "./redux/slice";
import { Link } from "react-router-dom";

export default function FriendsAndWannabes() {
    const dispatch = useDispatch();

    const wannabes = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => !friend.accepted)
    );

    const friends = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => friend.accepted)
    );

    useEffect(() => {
        fetch(`/friends.json`)
            .then((result) => result.json())
            .then((data) => {
                dispatch(receiveFriendsAndWannabes(data));
            })
            .catch((err) =>
                console.log("ERROR in handle ACCEPT FRIENDS: ", err)
            );
    }, []);

    const handleAccept = (id) => {
        fetch("/acceptfriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((result) => result.json())
            .then(() => {
                // console.log("DATA from handleAccept: ", data);
                const action = acceptFriend(id);
                dispatch(action);
            })
            .catch((err) =>
                console.log("ERROR in handle ACCEPT FRIENDS: ", err)
            );
    };

    const handleUnfriend = (id) => {
        fetch("/unfriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((result) => result.json())
            .then(() => {
                // console.log("UNFRIEND COMPONENT DATA: ", data);
                const action = unfriendFriend(id);
                dispatch(action);
            })
            .catch((err) => console.log("ERROR in handle Unfriend: ", err));
    };

    return (
        <section className="friendsAndWannabes">
            <h2 className="friendText">Wannabes</h2>
            <div className="friendsCon">
                {wannabes &&
                    wannabes.map((wannabe) => {
                        return (
                            <div key={wannabe.id}>
                                <Link to={`/user/${wannabe.id}`}>
                                    <img
                                        className="profilePic"
                                        src={wannabe.image_url}
                                    ></img>{" "}
                                </Link>
                                <p className="friendName">
                                    {wannabe.first_name} {wannabe.last_name}
                                </p>
                                <button
                                    onClick={() => {
                                        handleAccept(wannabe.id);
                                    }}
                                >
                                    Accept request
                                </button>
                            </div>
                        );
                    })}
            </div>
            <h2 className="friendText">Friends</h2>
            <div className="friendsCon">
                {friends &&
                    friends.map((friend) => {
                        return (
                            <div key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    <img
                                        className="profilePic"
                                        src={friend.image_url}
                                    ></img>
                                </Link>

                                <p className="friendName">
                                    {friend.first_name} {friend.last_name}
                                </p>
                                <button
                                    onClick={() => {
                                        handleUnfriend(friend.id);
                                    }}
                                >
                                    Unfriend
                                </button>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
