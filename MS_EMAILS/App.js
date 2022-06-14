const express = require('express');
const {Kafka} = require('kafkajs');
const nodemailer = require();

const app = express();

app.listen(3333);

const kafka = new Kafka({
    clientId: 'ms_emails',
    brokers: ['localhost:9092'],
});

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'd71dc8151dc46b',
        pass: '20202e019926c6',
    },
});

const topic = 'sendEmailsToAllAdmins';

const consumer_new_user = kafka.consumer({groupId: 'new-user'});

const consumer_bets = kafka.consumer({groupId: 'bets'});

const consumer_admin = kafka.consumer({groupId: 'admin'});

const consumer_reset_password = kafka.consumer({groupId: 'reset'});

const newUser = async (username, email) => {
    const message = {
        from: 'labylub@labluby.com.br',
        to: email,
        subject: 'Welcome Onboard!',
        html: `<h3> Welcome ${username} </h3>
        <p>
          <p>We are <strong>happy</strong> with your arrival!</p>
        </p>
        `,
    };

    transport.sendMail(message);
};

const newBet = async (username, email) => {
    const message = {
        from: 'labylub@labluby.com.br',
        to: email,
        subject: 'New Bet!',
        html: `<h3>Hello ${username}. New Bet Registred With Successfuly!</h3>
        <p>
          <p>You realizaded a bet</p>
          <p>The bet was added.</p>
        </p>`,
    };

    transport.sendMail(message);
};

const newBetAdmin = async (username, email, user) => {
    const message = {
        from: 'labylub@labluby.com.br',
        to: email,
        subject: `New Bet made by ${user}!`,
        html: `<h3>Hello ${username}. New Bet Registred With Successfuly!</h3>
        <p>
          <p>${user} realizaded a bet</p>
          <p>The bet was added.</p>
        </p>`,
    };

    transport.sendMail(message);
};

async function resetPassword(email, username, token, url) {
    const message = {
        from: 'labylub@labluby.com.br',
        to: email,
        subject: 'Password Reseted!',
        html: `<h3>Reset Password!</h3>
        <p>
          <p>You requested password reset.</p>
          <p>Password reseted with successfuly.</p>
        </p>`,
    };

    transport.sendMail(message);
}
