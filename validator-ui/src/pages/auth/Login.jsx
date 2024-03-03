import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import rocket from '../../assets/svgs/rocket.svg';
import { Container } from '../../components/Container';
import Form from '../../components/Form';
import { routes } from '../../routes/routes';
import { useLoginMutation } from '../../services/auth/auth.queries';

const schema = z
    .object({
        email: z.string().email('Email is required'),
    })
    .required();

// TODO: Error message when sending multiple emails in a short period of time

export function Login() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { mutate, isPending } = useLoginMutation();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm({ resolver: zodResolver(schema) });

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            return;
        }

        await executeRecaptcha('login');
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    function onSubmit(e) {
        handleReCaptchaVerify();

        mutate(e.email, {
            onError: () => setError('email', { type: 'custom', message: 'Invalid email address' }),
            onSuccess: () => navigate(`/${routes.CONFIRM_EMAIL}`),
        });
    }

    return (
        <Container className="flex items-center justify-around px-6">
            <img
                className="absolute object-cover transform hidden md:block translate-x-1/2 -translate-y-1/2"
                src={rocket}
                width="400"
                height="400"
                alt="Logo"
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Title text="Conectare" />
                <Form.Description text="Enter your email below to login to your account" />
                <Form.Field
                    id="email"
                    type="email"
                    label="Email"
                    register={register}
                    placeholder="m@example.com"
                    errorMessage={errors.email?.message}
                />
                <Form.Action text="Conectare" isLoading={isPending} />
            </Form>
        </Container>
    );
}
