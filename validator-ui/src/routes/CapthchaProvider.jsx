import PropTypes from 'prop-types';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const scriptProps = {
    async: false,
    defer: false,
    appendTo: 'head',
    nonce: undefined,
};

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
