import { JsonRpcHelper } from './JsonRpcHelper';
import type { OpmetRequest } from '../model/OpmetRequest';
import type { OpmetResult } from '../model/OpmetResult';
import type { JsonRpcResponse } from '../model/JsonRpcResponse';

/**
 * Query Opmet Service for weather informations
 * @param req Opmet Request
 * @returns Opmet Response
 */
const query = async (req: OpmetRequest): Promise<OpmetResult[]> => {
    const res = await fetch('https://ogcie.iblsoft.com/ria/opmetquery', {
        method: 'POST',
        body: JSON.stringify(JsonRpcHelper.createRequest('query', [req], req.id)),
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    });
    const data = await res.json() as JsonRpcResponse<OpmetResult>;
    return JsonRpcHelper.parseResponse(data);
};

/**
 * Opmet HTTP Service
 */
export const OpmetService = {
    query,
}
