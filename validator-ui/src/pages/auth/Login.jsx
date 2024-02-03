import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import logo from '../../assets/svgs/logo.svg';
import rocket from '../../assets/svgs/rocket.svg';
import { useLoginMutation } from '../../services/auth/auth.queries';

export function Login() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { mutate } = useLoginMutation();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            return;
        }

        await executeRecaptcha('login');
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    function handleSubmit(e) {
        e.preventDefault();
        handleReCaptchaVerify();
        const formData = new FormData(e.target);
        const email = formData.get('email');

        if (!email) {
            return;
        }

        mutate(email);
    }

    return (
        <div className="flex items-center justify-around h-screen">
            <img
                className="object-cover w-[50vw] transform hidden md:block"
                src={rocket}
                width="320"
                height="320"
                alt="Logo"
            />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-around w-full sm:w-1/2 h-1/3 mx-4 bg-bg-container rounded-lg shadow-xl drop-shadow-md transform translate-x-0 md:translate-x-[-30%]"
            >
                <h1 className="flex items-center justify-center text-2xl gap-2 font-bold text-center mt-10">
                    Dashboard
                    <img src={logo} alt="logo" width="100" height="100" />
                </h1>
                <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                    <div className="flex flex-col items-center justify-center w-full px-8">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="w-full lg:w-1/2 p-2 m-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-ring-primary focus:border-transparent"
                            placeholder="Enter an Email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-sm font-bold text-text-primary rounded-lg p-2 border border-border-primary hover:bg-bg-primary hover:text-white"
                    >
                        Autorizeaza
                    </button>

                    <p className="text-sm font-bold text-text-primary hidden">Email trimis</p>
                </div>
            </form>
        </div>
    );
}
