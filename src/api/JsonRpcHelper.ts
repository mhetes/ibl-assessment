import { v4 } from 'uuid';
import type { JsonRpcRequest } from '../model/JsonRpcRequest';
import type { JsonRpcResponse } from '../model/JsonRpcResponse';
import type { JsonRpcError } from '../model/JsonRpcError';

/**
 * JSON-RPC Exception
 */
export class JsonRpcException<E = object> extends Error {
    code: number;
    data: E;

    /**
     * Creates new JsonRpcException Exception
     * @param error JSON-RPC error payload
     */
    constructor(error: JsonRpcError<E>) {
        super(error.message);
        this.code = error.code;
        this.data = error.data;
    }
}

/**
 * Creates new JSON-RPC Request payload
 * @param method Method name of remote procedure to call
 * @param params Parameters of remote procedute call
 * @param forceId Id of JSON-RPC request to force. If empty it will be generated automatically
 * @returns JSON-RPC Request
 */
const createRequest = <T>(method: string, params: T, forceId?: string): JsonRpcRequest<T> => {
    return {
        id: forceId ?? v4(),
        method,
        params,
    };
};

/**
 * Parses JSON-RPC Response and returns response data of remote procedure or throws error if remote procedure call failed
 * @param res JSON-RPC Response payload
 * @returns RPC response
 */
const parseResponse = <T, E = object>(res: JsonRpcResponse<T, E>): T => {
    if (res.error) {
        throw new JsonRpcException<E>(res.error);
    }
    if (!res.result) {
        throw new JsonRpcException<null>({
            code: -1,
            data: null,
            message: 'No JSON-RPC result found',
        });
    }
    return res.result;
};

/**
 * JSON-RPC Helper
 */
export const JsonRpcHelper = {
    createRequest,
    parseResponse,
}
