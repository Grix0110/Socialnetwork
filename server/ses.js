const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

exports.sendEmail = function (code, email) {
    return ses
        .sendEmail({
            Source: "Gleaming Cokroach <gleaming.cockroach@spicedling.email>",
            Destination: {
                ToAddresses: [`${email}`],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `This is your Code ${code}`,
                    },
                },
                Subject: {
                    Data: "Your Application Has Been Accepted!",
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};
