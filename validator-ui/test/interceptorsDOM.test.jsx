import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AxiosInterceptors } from '../src/services/AxiosInterceptors';

describe('AxiosInterceptors', () => {
    test('should render children', () => {
        render(
            <AxiosInterceptors>
                <div>Test Children</div>
            </AxiosInterceptors>
        );

        expect(screen.getByText('Test Children')).toBeInTheDocument();
    });
});
