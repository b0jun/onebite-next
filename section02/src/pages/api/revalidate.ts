import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/'); // 페이지에 대해서 재생성
    return res.json({ revalidate: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).send('Revalidation Failed');
  }
}
