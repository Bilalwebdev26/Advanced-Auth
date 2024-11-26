import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAIL_TRAP_TOKEN;

export const mailtrapClients = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Bilal Ali",
};
// const recipients = [
//   {
//     email: "rapidapi9898@gmail.com",
//   }
// ];
//We make dynamic

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
