import { headers } from 'next/headers';

export const getNonce = () => headers().get('X-Nonce');
