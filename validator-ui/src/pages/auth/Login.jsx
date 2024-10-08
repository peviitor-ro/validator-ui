import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container';
import { routes } from '../../routes/routes';
import { useLoginMutation } from '../../services/auth/auth.queries';
import Form from '../../components/Form';

import * as z from 'zod';
import rocket from '../../assets/svgs/rocket.svg';
import PropTypes from 'prop-types';

const schema = z
    .object({
        email: z.string().email('Emailul este obligatoriu'),
    })
    .required();

/**
 * Template component for the login page.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSubmit - The function to handle form submission.
 * @param {Function} props.register - The function to register form fields.
 * @param {Object} props.errors - The object containing form validation errors.
 * @param {boolean} props.isLoading - The boolean indicating if the form is in a loading state.
 * @returns {JSX.Element} The rendered login template.
 */
export const Template = ({ onSubmit, register, errors, isLoading }) => {
    return (
        <Container className="flex items-center justify-around px-6">
            <Form onSubmit={onSubmit}>
                <Form.Title text="Conectare" />
                <Form.Description text="Introdu adresa de email pentru a primi un link de conectare." />
                <Form.Field
                    id="email"
                    type="email"
                    label="Email"
                    register={register}
                    placeholder="Adresa de email"
                    errorMessage={errors?.email?.message}
                />
                <Form.Action text="Conectare" isLoading={isLoading} />
            </Form>
        </Container>
    );
};

/**
 * Login component handles the user login process.
 *
 * This component integrates Google reCAPTCHA for verification, manages form state using
 * the `useForm` hook, and performs login mutation using the `useLoginMutation` hook.
 * It also handles navigation upon successful login.
 *
 * @component
 * @returns {JSX.Element} The rendered Login component.
 */
export function Login() {
    /**
     * Executes the Google reCAPTCHA verification.
     *
     * @function
     * @name executeRecaptcha
     * @returns {Promise<string>} A promise that resolves to the reCAPTCHA token.
     */
    const { executeRecaptcha } = useGoogleReCaptcha();

    /**
     * Custom hook to handle the login mutation.
     *
     * @constant
     * @type {Object}
     * @property {Function} mutate - Function to trigger the login mutation.
     * @property {boolean} isPending - Boolean indicating if the mutation is in progress.
     */
    const { mutate, isPending } = useLoginMutation();

    /**
     * Hook to navigate programmatically within the application.
     *
     * @constant
     * @type {function}
     */
    const navigate = useNavigate();

    /**
     * Destructures the necessary methods and properties from the useForm hook.
     *
     * @typedef {Object} FormState
     * @property {Object} errors - The errors object containing validation errors.
     *
     * @typedef {Object} UseFormReturn
     * @property {Function} register - Function to register input fields.
     * @property {FormState} formState - Object containing form state, including errors.
     * @property {Function} handleSubmit - Function to handle form submission.
     * @property {Function} setError - Function to manually set an error on a field.
     *
     * @param {Object} options - Options for the useForm hook.
     * @param {Function} options.resolver - Resolver function for schema validation.
     *
     * @returns {UseFormReturn} - Returns an object containing methods and properties for form handling.
     */
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm({ resolver: zodResolver(schema) });

    /**
     * Handles the reCAPTCHA verification process.
     *
     * This function uses the `executeRecaptcha` function to perform a reCAPTCHA
     * verification with the action 'login'. It ensures that the `executeRecaptcha`
     * function is available before attempting to execute it.
     *
     * @async
     * @function handleReCaptchaVerify
     * @returns {Promise<void>} A promise that resolves when the reCAPTCHA verification is complete.
     */
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            return;
        }

        await executeRecaptcha('login');
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    /**
     * Handles the form submission for the login page.
     *
     * @param {Object} e - The event object containing form data.
     * @param {string} e.email - The email address submitted in the form.
     *
     * @returns {void}
     */
    function onSubmit(e) {
        handleReCaptchaVerify();

        mutate(e.email, {
            onError: () =>
                setError('email', { type: 'custom', message: 'Adresa de email invalidă' }),
            onSuccess: () => navigate(`/${routes.CONFIRM_EMAIL}`),
        });
    }

    return (
        <Template
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isLoading={isPending}
        />
    );
}

Template.propTypes = {
    /**
     * Function to handle form submission
     */
    onSubmit: PropTypes.func,
    /**
     * Function to register form fields
     */
    register: PropTypes.func,
    /**
     * Object containing form errors
     */
    errors: PropTypes.object,
    /**
     * Boolean value to indicate if the form is loading
     */
    isLoading: PropTypes.bool,
};
