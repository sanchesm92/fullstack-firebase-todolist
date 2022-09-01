"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
jest.mock('axios');
describe('todo functional tests', () => {
    it('should return all tasks', async () => {
        const spy = jest.spyOn(global.testRequest, 'get');
        const { body, status } = await global.testRequest.get('/todos').query({ email: 'example@example.com' });
        expect(spy).toBeCalled();
        expect(status).toBe(200);
        expect(body).not.toBeUndefined();
        if (body[0]) {
            expect(body[0]).toHaveProperty('task');
            expect(body[0]).toHaveProperty('timestamp');
            expect(body[0]).toHaveProperty('id');
        }
    });
    it('should return task created', async () => {
        axios_1.default.post.mockResolvedValue({
            task: 'post test',
            email: 'newExample@newExample.com',
            timestamp: 123123124121,
            id: 'JnJbUB4J8Hd7h',
            message: 'created'
        });
        const body_send = {
            task: 'post test',
            email: 'newExample@newExample.com'
        };
        let result;
        await axios_1.default.post('', body_send).then((r) => result = r);
        expect(result).toHaveProperty('task');
        expect(result.task).toBe(body_send.task);
        expect(result.message).toBe('created');
        expect(result).not.toBeUndefined();
    });
    it('should return task updated', async () => {
        axios_1.default.put.mockResolvedValue({
            message: 'updated',
            task: 'put Test',
            email: 'putExample@putexample.com'
        });
        const body_send = {
            task: 'put Test',
            email: 'putExample@putexample.com'
        };
        let result;
        await axios_1.default.put('', body_send).then((r) => result = r);
        expect(result).toHaveProperty('task');
        expect(result.task).toBe(body_send.task);
        expect(result).not.toBeUndefined();
        expect(result.message).toBe('updated');
    });
    it('should return no body when delete task', async () => {
        axios_1.default.delete.mockResolvedValue(undefined);
        let result;
        await axios_1.default.delete('').then((r) => result = r);
        expect(result).toBeUndefined();
    });
});
//# sourceMappingURL=todos.test.js.map