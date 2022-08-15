const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const secretCode = require("crypto-random-string");
const ses = require("./ses");
const { uploader } = require("./middleware");
const s3 = require("./s3");
const cookieSession = require("cookie-session");
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;
const bcrypt = require("bcryptjs/dist/bcrypt");

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 24,
    })
);
app.use(express.json());

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.get("/user", function (req, res) {
    db.getUser(req.session.userId)
        .then((result) => {
            return res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in get User: ", err);
        });
});

app.post("/register", (req, res) => {
    let data = req.body;
    if (!data.firstName || !data.lastName || !data.email) {
        return res.json({
            success: false,
            message: "please check your Input!",
        });
    }
    let firstUpper = data.firstName[0].toUpperCase() + data.firstName.substr(1);
    let lastUpper = data.lastName[0].toUpperCase() + data.lastName.substr(1);
    db.insertUser(firstUpper, lastUpper, data.email, data.password)
        .then((results) => {
            req.session.userId = results.rows[0].id;
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log("ERROR in insertUser: ", err);
            res.json({
                success: false,
                message: "something went wrong, please try again!",
            });
        });
});

app.post("/login", (req, res) => {
    let data = req.body;
    if (!data.email || !data.password) {
        return res.json({
            success: false,
            message: "please check your Input!",
        });
    }
    db.findUser(req.body.email)
        .then((results) => {
            if (results.rows.length > 0) {
                const hash = results.rows[0].pword;
                bcrypt
                    .compare(req.body.password, hash)
                    .then((passwordMatch) => {
                        if (passwordMatch === true) {
                            req.session.userId = results.rows[0].id;
                            res.json({
                                success: true,
                                message: "User has logged in successfully!",
                            });
                        }
                    });
            }
        })
        .catch((err) => {
            console.log("ERROR in findUser: ", err);
            res.json({
                success: false,
                message: "something went wrong, please try again!",
            });
        });
});

app.post("/sendingCode", (req, res) => {
    let data = req.body;
    const code = secretCode({ length: 6 });

    if (!data.email) {
        return res.json({
            success: false,
            message: "please check your Input!",
        });
    }
    db.findUser(data.email)
        .then((results) => {
            if (results.rows.length > 0) {
                db.insertCode(results.rows[0].email, code).then(() => {
                    res.json({
                        success: true,
                        email: data.email,
                        message: "Email was send!",
                    });
                    return ses.sendEmail(code, results.rows[0].email);
                });
            } else {
                res.json({
                    success: false,
                    message: "You're not registered yet!",
                });
            }
        })
        .catch((err) => {
            console.log("ERROR in findUser: ", err);
            res.json({
                success: false,
                message: "something went wrong, please try again!",
            });
        });
});

app.post("/resetPassword", (req, res) => {
    const data = req.body;
    db.getCodes()
        .then((results) => {
            const mail = results.rows[0].email;
            db.updatePassword(data.password, mail)
                .then(() => {
                    res.json({
                        success: true,
                    });
                })
                .catch(
                    (err) => console.log("ERROR in update PW: ", err),
                    res.json({
                        success: false,
                        message: "something went wrong, please try again!",
                    })
                );
        })
        .catch(
            (err) => console.log("ERROR in get Codes: ", err),
            res.json({
                success: false,
                message: "your Code was either too old or not found!",
            })
        );
});

app.post(
    "/update-pic",
    uploader.single("profilePicture"),
    s3.upload,
    (req, res) => {
        let imageUrl = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
        let id = req.session.userId;
        db.updateProfilePic(imageUrl, id)
            .then((input) => {
                console.log(input.rows[0].image_url);
                res.json({ picture: imageUrl });
            })
            .catch(
                (err) => console.log("ERROR in update Profile: ", err),
                res.json({
                    success: false,
                    message: "something went wrong, please try again",
                })
            );
    }
);

app.post("/updateBio", (req, res) => {
    let biography = req.body.bio;
    let id = req.session.userId;
    db.insertBio(biography, id)
        .then((data) => {
            res.json(data.rows[0]);
        })
        .catch((err) => console.log("ERROR in insert BIO: ", err));
});

app.get("/getPeople", (req, res) => {
    db.findNewestPeople()
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => console.log("ERROR in find newest people: ", err));
});

app.get("/getPeople/:name", (req, res) => {
    let input = req.params.name;
    db.findPeople(input)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => console.log("ERROR in find people: ", err));
});

app.get("/otheruser/:id", (req, res) => {
    let id = req.params.id;
    db.getUser(id)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => console.log("ERROR in get User: ", err));
});

app.get("/friendship/:id", (req, res) => {
    let sender = req.session.userId;
    let recipent = req.params.id;
    db.findFriendship(sender, recipent)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => console.log("ERROR in find friendship: ", err));
});

app.post("/requestfriend", (req, res) => {
    let sender = req.session.userId;
    let recipent = req.body.id;

    db.requestFriendship(sender, recipent)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => console.log("ERROR in request friendship: ", err));
});

app.post("/acceptfriend", (req, res) => {
    let sender = req.session.userId;
    let recipent = req.body.id;

    db.acceptFriendship(sender, recipent)
        .then((result) => {
            console.log("ACCEPTFRIEND: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => console.log("ERROR in accept friendship: ", err));
});

app.post("/unfriend", (req, res) => {
    let sender = req.session.userId;
    let recipent = req.body.id;

    db.unfriend(sender, recipent)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => console.log("ERROR in unfriend: ", err));
});

app.get("/friends", (req, res) => {
    let id = req.session.id;
    db.getAllFriendStatus(id)
        .then((result) => {
            console.log("RESULT in SERVER: ", result);
            res.json();
        })
        .catch((err) => console.log("ERROR in get all friends status: ", err));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
