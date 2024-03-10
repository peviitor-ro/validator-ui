import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InputField } from '../../../../components/InputField/InputField';
import { Button } from '../../../../components/Button';
import { addScraper } from '../../../../services/landing/landing.service';

const schema = yup.object().shape({
    url: yup.string().url().required(),
    language: yup.string().required(),
});

export function AddScraperForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ resolver: yupResolver(schema) });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addScraper(data);
            window.location.reload();
        } catch (error) {
            setLoading(false);
            setError('url', { type: 'manual', message: error.message });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="text-gray-500">
                <div>
                    <label>Url</label>
                    <InputField
                        id="url"
                        placeholder="https://github.com/account/repository.git"
                        errorMessage={errors.url?.message}
                        type="text"
                        register={register}
                    />
                </div>
                <div>
                    <label>Language</label>
                    <InputField
                        id="language"
                        placeholder="Python"
                        errorMessage={errors.language?.message}
                        register={register}
                    />
                </div>
                <div>
                    <Button text="Adauga" isLoading={loading} />
                </div>
            </form>
        </div>
    );
}
