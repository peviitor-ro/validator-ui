import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const scriptProps = {
    async: false,
    defer: false,
    appendTo: 'head',
    nonce: undefined,
}

export function CapthchaProvider({ children }) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
            scriptProps={scriptProps}
        >
            {children}
        </GoogleReCaptchaProvider>
    )
}
