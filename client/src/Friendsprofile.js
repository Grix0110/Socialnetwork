import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";

import { receiveFriendsAndWannabes } from "./redux/slice";
import { Link } from "react-router-dom";

export default function Friendsprofile() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const friends = useSelector(
        (state) =>
            state.friends && state.friends.filter((friend) => friend.accepted)
    );

    useEffect(() => {
        fetch(`/${id}/friends.json`)
            .then((result) => result.json())
            .then((data) => {
                dispatch(receiveFriendsAndWannabes(data));
            })
            .catch((err) =>
                console.log("ERROR in handle ACCEPT FRIENDS: ", err)
            );
    }, []);

    return (
        <div className="friendsCon2">
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
                        </div>
                    );
                })}
        </div>
    );
}
