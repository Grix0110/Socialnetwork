// 1. received - sets state of the list of friends and and wannabes
// splitting up the data into two diffrent categories
// 2. accept one friend
// 3. unfriend one friend

export default function friendsAndWannabesReducer(friends = [], action) {
    if (action.type === "friendsAndWannabes/received") {
        // console.log("FRIENDS FROM SLICE: ", action.payload.friends);
        friends = action.payload.friends;
    }

    if (action.type === "friendsAndWannabes/accept") {
        friends = friends.map((friend) => {
            // console.log("LOG FROM SLICE: ", friend);
            if (friend.id == action.payload.id) {
                return { ...friend, accepted: true };
            } else {
                return friend;
            }
        });
        // return newFriends;
    }

    if (action.type === "friendsAndWannabes/unfriend") {
        console.log("ACTION PAYLOAD: ", action.payload);
        friends = friends.filter((friend) => {
            // console.log("LOG FROM SLICE: ", friend);
            if (friend.id != action.payload.id) {
                return { ...friend };
            }
        });
    }

    return friends;
}

// Creators of actions
// You need 3 action creators, one for each type (as above)
// 1. use it to update the state with data from the server.
//    payload: all friends, from the server
// 2. payload: id of the friend we're accepting
// 3. payload: id of the friend we're unfriending

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
