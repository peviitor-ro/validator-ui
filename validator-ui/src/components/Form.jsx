import { Button } from './Button';
import { InputField } from './InputField/InputField';

export default function Form({ children, ...rest }) {
    return (
        <form className="flex flex-col bg-card rounded-md p-6 shadow shadow-card-shadow" {...rest}>
            {children}
        </form>
    );
}

Form.Title = function ({ text }) {
    return <h1 className="text-2xl font-semibold">{text}</h1>;
};

Form.Description = function ({ text }) {
    return <p className="mb-10">{text}</p>;
};

Form.Action = function ({ text, isLoading }) {
    return <Button text={text} isLoading={isLoading} />;
};

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
