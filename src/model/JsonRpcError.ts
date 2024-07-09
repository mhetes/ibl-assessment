/**
 * JSON-RPC Error
 */
export interface JsonRpcError<E = object> {
    code: number;
    message: string;
    data: E;
}