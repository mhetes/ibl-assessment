/**
 * JSON-RPC Request
 */
export interface JsonRpcRequest<T> {
    id: string | number | null;
    method: string;
    params: T;
}
