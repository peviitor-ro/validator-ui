import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { post } from '../../../../services/landing/landing.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { routes } from '../../../../routes/routes';
import * as yup from 'yup';
import clsx from 'clsx';

/**
 * Validation schema for the company form.
 *
 * This schema validates that the `company` field is a required string.
 *
 * @type {Object}
 * @property {Object} company - The company field validation.
 * @property {string} company.required - Error message for the required company field.
 */
const schema = yup.object().shape({
    company: yup.string().required('Numele companiei este obligatoriu'),
});

/**
 * Form component for rendering a form with a title, children elements, a submit button, and error messages.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the form.
 * @param {function} props.handleOnSubmit - The function to handle form submission.
 * @param {boolean} props.loading - The loading state to indicate if the form is submitting.
 * @param {string} props.titleText - The title text to be displayed at the top of the form.
 * @param {Object} props.errors - The errors object containing validation error messages.
 * @param {Object} props.errors.company - The company-specific error messages.
 * @param {string} props.errors.company.message - The error message for the company field.
 *
 * @returns {JSX.Element} The rendered form component.
 */
const Form = ({ children, handleOnSubmit, loading, titleText, errors }) => {
    return (
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <h2 className="text-2xl font-semibold">{titleText}</h2>
            {children}
            <Button text="Adauga" isLoading={loading} />
            {errors && <p className="text-error">{errors.company?.message}</p>}
        </form>
    );
};

/**
 * Input component renders a label and an input or textarea element based on the inputType prop.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.labelText - The text to display for the label.
 * @param {string} [props.inputType='text'] - The type of input element to render ('text' or 'textarea').
 * @param {string} props.inputId - The id for the input element.
 * @param {string} props.className - The CSS class for the input element.
 * @param {string} props.placeholder - The placeholder text for the input element.
 * @param {string} props.defaultValue - The default value for the input element.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = ({
    labelText,
    inputType = 'text',
    inputId,
    className,
    placeholder,
    defaultValue,
    disabled = false,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="text-sm font-semibold">
                {labelText}
            </label>
            {inputType === 'textarea' ? (
                <textarea
                    id={inputId}
                    className={className}
                    cols={30}
                    rows={5}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            ) : (
                <input
                    type={inputType}
                    id={inputId}
                    className={className}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    aria-errormessage={`${inputId}-error`}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export function CompanyForm({ company, scname, website, description, method = 'POST' }) {
    // Define the loading state
    /**
     * State variable to manage the loading state of the component.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(false);

    /**
     * Destructures handleSubmit, errors, and setError from the useForm hook.
     * The useForm hook is configured with a resolver that uses the provided schema.
     *
     * @typedef {Object} FormState
     * @property {Object} errors - An object containing form validation errors.
     *
     * @typedef {Object} UseFormReturn
     * @property {Function} handleSubmit - Function to handle form submission.
     * @property {FormState} formState - Object containing form state, including errors.
     * @property {Function} setError - Function to manually set an error on a form field.
     *
     * @returns {UseFormReturn} The return values from the useForm hook.
     */
    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Generates a string of class names based on the presence of errors.
     *
     * @constant {string} errorClass - The resulting class names.
     * @param {Object} errors - An object containing error states.
     * @param {boolean} errors.company - Indicates if there is an error related to the company.
     * @returns {string} A string of class names.
     */
    const errorClass = clsx(
        {
            'border-error': errors.company,
            'border-subtitle': !errors.company,
        },
        'border-input h-full w-full p-2',
    );

    /**
     * Handles the form submission for adding or updating a company.
     *
     * @param {Event} e - The form submission event.
     * @returns {Promise<void>} - A promise that resolves when the form submission is complete.
     *
     * @async
     * @function onSubmit
     *
     * @description
     * This function is triggered when the form is submitted. It prevents the default form submission behavior,
     * destructures the form data, validates the company name, and makes an API request to either add or update
     * a company. If the company name is not provided, it sets an error message. If the API request is successful,
     * the page is reloaded. If there is an error during the API request, it sets an error message indicating that
     * the company already exists.
     *
     * @throws Will set an error message if the company name is not provided or if the company already exists.
     */
    const onSubmit = async (e) => {
        e.preventDefault();

        // Destructure the form data
        const companyInput = e.target.company.value;
        const scname = e.target.scname.value;
        const website = e.target.website.value;
        const description = e.target.description.value;

        // Validate the company name
        if (!companyInput) {
            setError('company', {
                type: 'manual',
                message: 'Numele companiei este obligatoriu',
            });
            return;
        }

        // Make the API request
        try {
            const data = {
                company: company,
                update: {
                    company: companyInput,
                    scname: scname,
                    website: website,
                    description: description,
                },
            };

            // Set the loading state
            setLoading(true);
            const response =
                method === 'POST'
                    ? await post(routes.COMPANY_ADD, data.update)
                    : await post(routes.COMPANY_UPDATE, data);
            // Check the response status
            if (response.status === 201 || response.status === 200) {
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

    const handleOnSubmit = (e) => {
        handleSubmit(onSubmit(e));
    };

    return (
        <Form
            handleOnSubmit={handleOnSubmit}
            loading={loading}
            titleText="Adauga companie"
            errors={errors}
        >
            <Input
                labelText="Nume"
                inputType="text"
                inputId="company"
                className={errorClass}
                placeholder="Numele companiei"
                defaultValue={company}
            />
            <Input
                labelText="Denumirea Societatii"
                inputType="text"
                inputId="scname"
                className="border-input h-full w-full p-2"
                placeholder="Denumirea societatii"
                defaultValue={scname}
            />
            <Input
                labelText="Website"
                inputType="text"
                inputId="website"
                className="border-input h-full w-full p-2"
                placeholder="Website-ul companiei"
                defaultValue={website}
            />

            <Input
                labelText="Descriere"
                inputType="textarea"
                inputId="description"
                className="border-input h-full w-full p-2"
                placeholder="Descriere companiei"
                defaultValue={description}
            />
        </Form>
    );
}
