import { JsonRpcHelper, JsonRpcException } from './JsonRpcHelper';

const internalPayload = { one: 1, two: '2', yes: true };
const fallbackUuid = 'edf23069-e6ff-4b01-abb1-3d086d2c8787';

jest.mock('uuid', () => { return { v4: () => fallbackUuid }; });

describe('JsonRpcHelper tests', () => {
    it('creates JSON-RPC payload', () => {
        const res = JsonRpcHelper.createRequest('run', internalPayload);
        expect(res).toEqual({
            id: fallbackUuid,
            method: 'run',
            params: internalPayload,
        });
    });

    it('creates JSON-RPC payload with predefined id', () => {
        const myUuid = 'bf1af7b1-1a0b-41bc-a678-92d3d0371c35';
        const res = JsonRpcHelper.createRequest('run', internalPayload, myUuid);
        expect(res).toEqual({
            id: myUuid,
            method: 'run',
            params: internalPayload,
        });
    });

    it('unpack valid JSON-RPC response', () => {
        const received = {
            id: 123,
            error: null,
            result: internalPayload,
        };
        const res = JsonRpcHelper.parseResponse(received);
        expect(res).toEqual(internalPayload);
    });

    it('throw error on invalid JSON-RPC response', () => {
        const received = {
            id: 123,
            error: {
                code: -12,
                message: 'Some error occured',
                data: {
                    file: 'server.js',
                    line: 13,
                },
            },
            result: null,
        };
        expect.assertions(4);
        try {
            JsonRpcHelper.parseResponse(received);
        } catch (e) {
            expect(e instanceof JsonRpcException).toEqual(true);
            const jree = e as JsonRpcException;
            expect(jree.code).toEqual(-12);
            expect(jree.message).toEqual('Some error occured');
            expect(jree.data).toEqual({ file: 'server.js', line: 13 });
        }
    });

    it('throws error on empty but seemingly correct JSON-RPC response', () => {
        const received = {
            id: 123,
            error: null,
            data: null,
        };
        expect.assertions(4);
        try {
            // @ts-ignore
            JsonRpcHelper.parseResponse(received);
        } catch (e) {
            expect(e instanceof JsonRpcException).toEqual(true);
            const jree = e as JsonRpcException;
            expect(jree.code).toEqual(-1);
            expect(jree.message).toEqual('No JSON-RPC result found');
            expect(jree.data).toEqual(null);
        }
    });
});