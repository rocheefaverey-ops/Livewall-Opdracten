import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).json({ currentTime });
};