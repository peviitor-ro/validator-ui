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
    isSystemVariable: yup.bool(),
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-gray-500">
                <div>
                    <label htmlFor="url">Url</label>
                    <InputField
                        id="url"
                        name="url"
                        placeholder="https://github.com/account/repository.git"
                        errorMessage={errors.url?.message}
                        type="text"
                        register={register}
                    />
                </div>
                <div>
                    <label htmlFor="language">Container</label>
                    <select
                        id="language"
                        {...register('language')}
                        className="
                        border-input h-full w-full p-2
                    "
                    >
                        <option value="Python">Python</option>
                        <option value="Node">Node.js (JavaScript)</option>
                        <option value="Jmeter">Jmeter (Java)</option>
                    </select>
                </div>
                <div className="flex items-center justify-center gap-4 w-full mt-4">
                    <input
                        type="checkbox"
                        id="isSystemVariable"
                        {...register('isSystemVariable')}
                    />
                    <label htmlFor="isSystemVariable">Seteaza-l ca variabila de sistem</label>
                </div>
                <div>
                    <Button text="Adauga" isLoading={loading} />
                </div>
            </form>
        </div>
    );
}
