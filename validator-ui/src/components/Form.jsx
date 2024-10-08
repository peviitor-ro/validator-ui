import { Button } from './Button';
import { InputField } from './InputField/InputField';
import RetroGrid from './ui/retro-grid';
import Globe from './ui/globe';

/**
 * A form component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the form.
 * @returns {JSX.Element} The rendered form component.
 */
export default function Form({ children, ...rest }) {
    return (
        <form
            className="flex bg-card rounded-md p-6 drop-shadow-lg w-full max-w-xl z-10 border"
            {...rest}
        >
            <RetroGrid className="top-0 left-0" />
            <div className="w-full">{children}</div>
            <Globe className="hidden md:block relative mx-auto right-0" />
        </form>
    );
}

/**
 * A title component for the form.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed as the title.
 * @returns {JSX.Element} The rendered title component.
 */
Form.Title = function ({ text }) {
    return <h1 className="text-2xl font-semibold">{text}</h1>;
};

/**
 * A description component for the form.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed as the description.
 * @returns {JSX.Element} The rendered description component.
 */
Form.Description = function ({ text }) {
    return <p className="mb-10">{text}</p>;
};

/**
 * An action component for the form.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be displayed as the action.
 * @param {boolean} props.isLoading - Indicates whether the action is in a loading state.
 * @returns {JSX.Element} The rendered action component.
 */
Form.Action = function ({ text, isLoading }) {
    return <Button text={text} isLoading={isLoading} />;
};

/**
 * A field component for the form.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the field.
 * @param {string} props.type - The type of the field.
 * @param {string} props.label - The label of the field.
 * @param {Function} props.register - The register function for the field.
 * @param {string} props.placeholder - The placeholder text for the field.
 * @param {string} props.errorMessage - The error message for the field.
 * @returns {JSX.Element} The rendered field component.
 */
Form.Field = function ({ id, type, label, register, placeholder, errorMessage }) {
    return (
        <InputField
            id={id}
            type={type}
            label={label}
            register={register}
            placeholder={placeholder}
            errorMessage={errorMessage}
        />
    );
};
