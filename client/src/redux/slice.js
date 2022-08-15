// 1. received - sets state of the list of friends and and wannabes
// splitting up the data into two diffrent categories
// 2. accept one friend
// 3. unfriend one friend

export default function friendsAndWannabes(friends = [], action) {
    if (action.type === "friends-and-wannabes/received") {
        return action.payload.friends;
    } else if (action.type === "friends-and-wannabes/accept") {
        const newFriends =
            friends.map(/** do something with action.payload.id... */);
        return newFriends;
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
        type: "/friends-and-wannabes/accept",
        payload: { id },
    };
}

export function receiveFriendsAndWannabes() {
    // ...
}
