export default function friendsAndWannabesReducer(friends = [], action) {
    if (action.type === "friendsAndWannabes/received") {
        friends = action.payload.friends;
    }

    if (action.type === "friendsAndWannabes/accept") {
        friends = friends.map((friend) => {
            if (friend.id == action.payload.id) {
                return { ...friend, accepted: true };
            } else {
                return friend;
            }
        });
    }

    if (action.type === "friendsAndWannabes/unfriend") {
        console.log("ACTION PAYLOAD: ", action.payload);
        friends = friends.filter((friend) => {
            if (friend.id != action.payload.id) {
                return { ...friend };
            }
        });
    }

    return friends;
}

export function acceptFriend(id) {
    return {
        type: "friendsAndWannabes/accept",
        payload: { id },
    };
}

export function receiveFriendsAndWannabes(friends) {
    return {
        type: "friendsAndWannabes/received",
        payload: { friends },
    };
}

export function unfriendFriend(id) {
    return {
        type: "friendsAndWannabes/unfriend",
        payload: { id },
    };
}
