import { expect, test, vi } from 'vitest';
import { sum } from './sum';

vi.mock('axios', () => {
    return {
        interceptors: {
            request: {
                use: vi.fn(),
                eject: vi.fn(),
            },
            response: {
                use: vi.fn(),
                eject: vi.fn(),
            },
        },
    };
});

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
