import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { sendPersonalizedEmail } from './email.service';


const router = Router();
const upload = multer({ dest: 'uploads/' });


router.post('/send-bulk-email', upload.single('htmlFile'), async (req: Request, res: Response) => {
  try {
    const { subject, recipients } = req.body;
    const htmlFile = req.file;


    if (!htmlFile || !subject || !recipients) {
      return res.status(400).json({ error: 'Missing fields: htmlFile, subject, recipients' });
    }


    let recipientList: string[];
    try {
      recipientList =
       typeof recipients === 'string' ? JSON.parse(recipients) : (recipients as string[]);
      if (!Array.isArray(recipientList)) {
        throw new Error('Recipients must be an array of emails');
      }
    } catch {
      return res.status(400).json({ error: 'Invalid recipients JSON' });
    }


    const htmlTemplate = fs.readFileSync(path.resolve(htmlFile.path), 'utf-8');
    const results: any[] = [];


    for (const email of recipientList) {
      try {
        const result = await sendPersonalizedEmail({ to: email, subject, html: htmlTemplate });
        results.push({ email, status: 'sent', messageId: result.MessageId });
      } catch (err: any) {
        results.push({ email, status: 'failed', error: err.message });
      }
    }


    fs.unlinkSync(htmlFile.path);
    res.json({ results });
  } catch (err: any) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


export default router;
