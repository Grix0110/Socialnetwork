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
            );
    }
);

app.post("/updateBio", (req, res) => {
    console.log("BIOGRAPHY: ", req.body.bio);
    res.json({ bio: req.body.bio });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});