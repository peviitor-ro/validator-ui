import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { post } from '../../../../services/landing/landing.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

// Define the validation schema
const schema = yup.object().shape({
    company: yup.string().required('Numele companiei este obligatoriu'),
});

export function CompanyForm() {
    // Define the loading state
    const [loading, setLoading] = useState(false);

    // Destructure the form methods
    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Define the error class
    const errorClass = clsx(
        {
            'border-error': errors.company,
            'border-subtitle': !errors.company,
        },
        'border-input h-full w-full p-2',
    );

    // Define the submit function
    const onSubmit = async (e) => {
        e.preventDefault();

        // Destructure the form data
        const company = e.target.company.value;
        const scname = e.target.scname.value;
        const website = e.target.website.value;
        const description = e.target.description.value;

        // Validate the company name
        if (!company) {
            setError('company', {
                type: 'manual',
                message: 'Numele companiei este obligatoriu',
            });
            return;
        }

        // Make the API request
        try {
            // Set the loading state
            setLoading(true);
            const response = await post('companies/', {
                company,
                scname,
                website,
                description,
            });

            // Check the response status
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            setLoading(false);

            // Set the error message
            setError('company', {
                type: 'manual',
                message: 'Compania exista deja',
            });
        }
    };

    // Define the submit handler
    const handleOnSubmit = (e) => {
        handleSubmit(onSubmit(e));
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <h2 className="text-2xl font-semibold">Adauga companie</h2>
            <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-semibold">
                    Nume
                </label>
                <input
                    type="text"
                    id="company"
                    className={errorClass}
                    placeholder="Numele companiei"
                    aria-errormessage="error-company"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="scname" className="text-sm font-semibold">
                    Denumirea Societatii
                </label>
                <input
                    type="text"
                    id="scname"
                    className="border-input h-full w-full p-2"
                    placeholder="Denumirea societatii"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="website" className="text-sm font-semibold">
                    Website
                </label>
                <input
                    type="text"
                    id="website"
                    className="border-input h-full w-full p-2"
                    placeholder="Website-ul companiei"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold">
                    Descriere
                </label>
                <textarea
                    id="description"
                    className="border-input h-full w-full p-2"
                    cols={30}
                    rows={5}
                    placeholder="Descriere companiei"
                />
            </div>

            <Button text="Adauga" isLoading={loading} />

            {errors && <p className="text-error">{errors.company?.message}</p>}
        </form>
    );
}
