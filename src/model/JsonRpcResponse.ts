import { JsonRpcError } from './JsonRpcError';

/**
 * JSON-RPC Response
 */
export interface JsonRpcResponse<T, E = object> {
    id: string | number | null;
    error: null | JsonRpcError<E>;
    result: null | T;
}
