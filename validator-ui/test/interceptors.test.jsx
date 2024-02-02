import { describe, expect, test, vi } from 'vitest';
import * as axios from '../src/services/Api';
import { ERROR_MESSAGE, authResponseInterceptor } from '../src/services/AxiosInterceptors';
import * as authService from '../src/services/auth/auth.service';

const INITIAL_STATE = {
    store: {
        isRefreshing: false,
    },
    error: {
        config: { headers: {} },
        response: { status: 403 },
    },
    errorMessage: '',
};

describe('authResponseInterceptor', () => {
    let state = INITIAL_STATE;

    afterEach(() => {
        state = INITIAL_STATE;
    });

    test('should handle 403 status code and log out if refresh token is invalid', async () => {
        const { error, store } = state;
        let { errorMessage } = state;

        const refreshToken = 'mockRefreshToken';
        const logout = vi.fn();
        const updateAccessToken = vi.fn();

        const authContext = {
            refreshToken,
            logout,
            updateAccessToken,
        };

        const updateExpiredAccesTokenSpy = vi.spyOn(authService, 'updateExpiredAccessToken');

        updateExpiredAccesTokenSpy.mockResolvedValue({
            access: null,
        });

        try {
            await authResponseInterceptor(error, authContext, store);
        } catch (error) {
            errorMessage = error?.message;
        }

        expect(logout).toHaveBeenCalledOnce();

        expect(updateAccessToken).not.toHaveBeenCalled();

        expect(false).toBe(store.isRefreshing);

        expect(ERROR_MESSAGE.INVALID_TOKEN).toBe(errorMessage);
    });

    test('should handle 403 status code and log out if refresh token is not provided', async () => {
        const { error, store } = state;
        let { errorMessage } = state;

        const refreshToken = null;
        const logout = vi.fn();
        const updateAccessToken = vi.fn();

        const authContext = {
            refreshToken,
            logout,
            updateAccessToken,
        };

        const updateExpiredAccesTokenSpy = vi.spyOn(authService, 'updateExpiredAccessToken');

        updateExpiredAccesTokenSpy.mockResolvedValue({
            access: 'new token',
        });

        try {
            await authResponseInterceptor(error, authContext, store);
        } catch (error) {
            errorMessage = error?.message;
        }

        expect(logout).toHaveBeenCalled(1);

        expect(updateAccessToken).not.toHaveBeenCalled();

        expect(INITIAL_STATE.store.isRefreshing).toBe(store.isRefreshing);

        expect(ERROR_MESSAGE.TOKEN_NOT_FOUND).toBe(errorMessage);
    });

    it('should handle 403 status code and update token if refresh token is provided', async () => {
        const { error, store } = state;
        let { errorMessage } = state;

        const refreshToken = 'old token';
        const logout = vi.fn();
        const updateAccessToken = vi.fn();

        const authContext = {
            refreshToken,
            logout,
            updateAccessToken,
        };

        const expectedOriginalRequest = {
            headers: {
                Authorization: 'Bearer new token',
            },
        };

        const updateExpiredAccesTokenSpy = vi.spyOn(authService, 'updateExpiredAccessToken');
        const privateApiSpy = vi.spyOn(axios, 'PRIVATE_API');

        privateApiSpy.mockRejectedValue(expectedOriginalRequest);

        updateExpiredAccesTokenSpy.mockResolvedValue({
            access: 'new token',
        });

        try {
            await authResponseInterceptor(error, authContext, store);
        } catch (err) {
            errorMessage = err?.message ?? '';
        }

        expect(logout).not.toHaveBeenCalled();

        expect(updateAccessToken).toHaveBeenCalledOnce();

        expect(privateApiSpy).toHaveBeenCalledOnce();

        expect(expectedOriginalRequest).toStrictEqual(error.config);

        expect(INITIAL_STATE.store.isRefreshing).toBe(store.isRefreshing);

        expect(INITIAL_STATE.errorMessage).toBe(errorMessage);
    });
});
