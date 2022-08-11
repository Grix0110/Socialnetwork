import { useState, useEffect } from "react";

export default function FindPeople() {
    const [newPeople, setNewPeople] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        let abort = false;
        (async () => {
            try {
                const result = await fetch(`/getPeople/${name}`);
                const data = await result.json();
                if (!abort) {
                    setNewPeople(data);
                }
            } catch (err) {
                console.log("ERROR in getting Users", err);
            }
        })();
        return () => {
            abort = true;
        };
    }, [name]);

    return (
        <section className="findContainer">
            <h2>Find other people:</h2>
            <input
                className="findInput"
                type="text"
                name="firstName"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            ></input>
            <ul className="peopleList">
                {newPeople.map((item, id) => (
                    <li key={id}>
                        <img
                            className="listImage"
                            src={
                                item.image_url ||
                                "./png-transparent-social-media-icons-avatar-user-profile-login-black-circle-silhouette-symbol.png"
                            }
                        />
                        {item.first_name} {item.last_name}{" "}
                    </li>
                ))}
            </ul>
        </section>
    );
}
