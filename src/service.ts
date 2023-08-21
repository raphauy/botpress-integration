import axios from 'axios';
import https from 'https';

export async function sendWapMessage(url: string, phone: string, body: string): Promise<void> {

  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    phone,
    body,
  };

  try {
    const response = await axios.post(url, data, {
      headers: headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
