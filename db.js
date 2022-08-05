const bcrypt = require("bcryptjs/dist/bcrypt");
const spicedPg = require("spiced-pg");

let databaseUrl;
if (process.env.NODE_ENV === "production") {
    databaseUrl = process.env.DATABASE_URL;
} else {
    const {
        DB_NAME,
        DB_PW,
        DB_HOST,
        DB_PORT,
        DB_BASE,
    } = require("./secrets.json");
    databaseUrl = `postgres:${DB_NAME}:${DB_PW}@${DB_HOST}:${DB_PORT}/${DB_BASE}`;
}

const db = spicedPg(databaseUrl);

function hashPassword(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

module.exports.insertUser = (first, last, email, pword) => {
    return hashPassword(pword).then((hashedPassword) => {
        return db.query(
            `INSERT INTO users(first_name, last_name, email, pword) VALUES ($1, $2, $3, $4) RETURNING id`,
            [first, last, email, hashedPassword]
        );
    });
};

module.exports.findUser = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

module.exports.insertCode = (email, code) => {
    return db.query(`INSERT INTO reset_codes(email, code) VALUES ($1, $2)`, [
        email,
        code,
    ]);
};

module.exports.getCodes = () => {
    return db.query(
        `
        SELECT * FROM reset_codes WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
        `
    );
};

module.exports.updatePassword = (pword, email) => {
    return hashPassword(pword).then((hashedPassword) => {
        return db.query(
            `
            UPDATE users SET pword=$1 WHERE email=$2`,
            [hashedPassword, email]
        );
    });
};
