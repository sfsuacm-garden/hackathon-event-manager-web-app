import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';

dotenv.config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

interface EmailInput {
to: string;
subject: string;
html: string;
}

export const sendPersonalizedEmail = ({
  to,
  subject,
  html
}: EmailInput) => {
  const command = new SendEmailCommand({
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Html: { Data: html } }
    },
    Source: `"SFHacks Team" <${process.env.SES_FROM_ADDRESS!}>`
  });




  return sesClient.send(command);
};


