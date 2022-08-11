import { useState } from "react";

export default function useAuthSubmit(url, values) {
    const [error, setError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
                if (!data.success && data.message) {
                    setError({ message: data.message });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("ERROR in FormSubmit: ", err);
            });
    };

    return [error, onSubmit];
}
