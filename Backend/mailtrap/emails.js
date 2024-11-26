import { response } from "express";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./email.Template.js";
import { mailtrapClients, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClients.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully : ", response);
  } catch (error) {
    console.error(`Error sending verification : ${error} `);
    throw new Error(`Error sending verification email : ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClients.send({
      from: sender,
      to: recipient,
      template_uuid: "4a845656-0d47-49eb-b8e0-32487ce4cfe5",
      template_variables: {
        name: name,
      },
    });
    console.log("Welcome Email Sent successfully : ", response);
  } catch (error) {
    console.log("Error while sent welcome email : ", error);
  }
};

export const sendResetMail = async (email) => {
  const recipient = [{ email }];
  try {
    const Response = await mailtrapClients.send({
      from: sender,
      to: recipient,
      subject: "Reset Password Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password",
    });
    console.log("Response of Reset Successfully : ", response);
  } catch (error) {
    console.error(`Error sending verification : ${error} `);
    throw new Error(`Error sending verification email : ${error}`);
  }
};

export const sendResetPassword = async (email, url) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClients.send({
      from: sender,
      to: recipient,
      subject: "Reset Password Mail",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: "Reset Password",
    });
    console.log("Response : ", response);
  } catch (error) {
    console.error(`Error sending verification : ${error} `);
    throw new Error(`Error sending verification email : ${error}`);
  }
};
