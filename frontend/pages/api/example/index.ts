import { withExceptionHandler } from '@utils/error-handling/api-exception-handler';
import { NextApiRequest } from 'next';

const handler = async (req: NextApiRequest) => {
  // api-route specific logic goes here
  // eslint-disable-next-line no-console
  console.log('Youre request was accepted by endpoint: ', req.query);

  return { msg: 'success' };
};

export default withExceptionHandler(handler, 'GET'); // Accepted request methods as either single "GET" or multiple ["GET","POST","DELETE"]
