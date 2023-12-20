import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).json({ currentTime });
};

export default handler;
