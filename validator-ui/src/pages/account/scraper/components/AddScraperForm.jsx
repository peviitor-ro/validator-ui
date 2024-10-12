import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { post } from '../../../../services/landing/landing.service';
import { routes } from '../../../../routes/routes';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InputField } from '../../../../components/InputField/InputField';
import { Button } from '../../../../components/Button';

const schema = yup.object().shape({
    url: yup.string().url().required(),
    language: yup.string().required(),
    key: yup.string(),
    value: yup.string(),
    isSystemVariable: yup.bool(),
});

/**
 * AddScraperForm component handles the form submission for adding a new scraper.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setScrapers - Function to update the list of scrapers.
 * @param {Function} props.setAlertOpen - Function to set the alert open state.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {Function} props.setAlertType - Function to set the alert type.
 *
 * @returns {JSX.Element} The rendered AddScraperForm component.
 */
export function AddScraperForm({ setScrapers, setAlertOpen, setAlertMessage, setAlertType }) {
    // Function to set the alert message and type
    const setAlert = (message, type) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(type);
    };

    // Form state hooks
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ resolver: yupResolver(schema) });

    // Loading state hook
    const [loading, setLoading] = useState(false);

    // Function to handle form submission
    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);

        // Map the language to the corresponding type
        const typeLanguage = {
            Python: 'Python',
            Node: 'JavaScript',
            Jmeter: 'Jmeter',
        };

        try {
            const response = await post(routes.SCRAPER_ADD, data);
            const newScraper = {
                name: response.data.container,
                language: typeLanguage[data.language],
                endpoint: window.location.origin + '/scraper/' + response.container + '/',
            };
            setScrapers((prev) => [newScraper, ...prev]);
            setAlert('Scraperul a fost adaugat cu succes', 'success');
            e.target.reset();
        } catch (error) {
            setLoading(false);
            setError('url', { type: 'manual', message: error.message });
            setAlert('A aparut o eroare', 'error');
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
                        className="border-input h-full w-full p-2"
                    >
                        <option value="Python">Python</option>
                        <option value="Node">Node.js (JavaScript)</option>
                        <option value="Jmeter">Jmeter (Java)</option>
                    </select>
                </div>
                <div>
                    <span className="text-gray-400 text-sm">
                        Seteaza variabilela de mediu pentru email (optional)
                    </span>
                    <div className="flex justify-between gap-2 w-full">
                        <div className="w-1/2">
                            <label htmlFor="key">Cheie</label>
                            <InputField
                                id="key"
                                name="key"
                                placeholder="cheie"
                                type="text"
                                register={register}
                                showError={false}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="value">Email</label>
                            <InputField
                                id="value"
                                name="value"
                                placeholder="Email"
                                type="text"
                                register={register}
                                showError={false}
                            />
                        </div>
                    </div>
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
