import { NextApiRequest, NextApiResponse } from 'next';
import { PineconeClient } from '@pinecone-database/pinecone';
import { queryPineconeVectorStoreAndQueryLLM } from '../../../utils';
import { indexName } from '../../../config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    console.log('body: ', body);

    const client = new PineconeClient();
    await client.init({
        apiKey: process.env.PINECONE_API_KEY || '',
        environment: process.env.PINECONE_ENVIRONMENT || '',
    });

    const text = await queryPineconeVectorStoreAndQueryLLM(client, indexName, body, );

    res.status(200).json({ data: text });
}
