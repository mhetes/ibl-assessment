import { v4 } from 'uuid';
import { JsonRpcRequest } from '../model/JsonRpcRequest';
import { JsonRpcResponse } from '../model/JsonRpcResponse';
import { JsonRpcError } from '../model/JsonRpcError';

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

const createRequest = <T>(data: T, method: string, forceId?: string): JsonRpcRequest<T> => {
    return {
        id: forceId ?? v4(),
        method,
        params: data,
    };
};

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

export const JsonRpcHelper = {
    createRequest,
    parseResponse,
}
