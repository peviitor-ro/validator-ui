import PropTypes from 'prop-types';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const scriptProps = {
    async: false,
    defer: false,
    appendTo: 'head',
    nonce: undefined,
};

/**
 * CapthchaProvider component that wraps its children with GoogleReCaptchaProvider.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The GoogleReCaptchaProvider wrapping the children.
 */
export function CapthchaProvider({ children }) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}
            scriptProps={scriptProps}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}

CapthchaProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
