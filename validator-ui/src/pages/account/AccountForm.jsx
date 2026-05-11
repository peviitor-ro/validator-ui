import { Spinner } from '../../components/Spinner';
import { addUser } from '../../services/landing/landing.service';
import { Alert } from '../../components/Alert';
import { useState } from 'react';

/**
 * AccountForm component handles the form submission for adding a new user account.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.loading - Indicates if the form is in a loading state.
 * @param {Function} props.setLoading - Function to set the loading state.
 * @param {string} props.alertMessage - The message to be displayed in the alert.
 * @param {Function} props.setAlertMessage - Function to set the alert message.
 * @param {boolean} props.alert - Indicates if the alert is visible.
 * @param {Function} props.setAlert - Function to set the alert visibility.
 * @param {string} props.alertType - The type of the alert (e.g., 'error', 'success').
 * @param {Function} props.setAlertType - Function to set the alert type.
 *
 * @returns {JSX.Element} The rendered AccountForm component.
 */
export function AccountForm({
    loading,
    setLoading,
    alertMessage,
    setAlertMessage,
    alert,
    setAlert,
    alertType,
    setAlertType,
}) {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await addUser(email);
            if (response === 201) {
                setEmail('');
                setLoading(false);
                setAlertMessage('Contul a fost adaugat');
                setAlertType('success');
                setAlert(true);
            } else {
                setLoading(false);
                setAlertMessage('A aparut o eroare');
                setAlertType('error');
                setAlert(true);
            }
        } catch (error) {
            setLoading(false);
            setAlertMessage('A aparut o eroare');
            setAlertType('error');
            setAlert(true);
        }
    };

    return (
        <>
            {alert && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    visible={alert}
                    setVisible={setAlert}
                />
            )}
            <div className="flex flex-col gap-4 m-2 p-2 border bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-500 border-b-2 pb-2">
                    Adaugare cont
                </h2>
                <form className="flex flex-col gap-4 text-gray-500" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email_account">Adauga Utilizator</label>
                        <input
                            type="email"
                            id="email_account"
                            className="border-input h-full w-full p-2"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center btn btn-green text-center w-[100px] px-4"
                        disabled={loading || !email}
                    >
                        {loading ? (
                            <p className="flex items-center gap-2 text-white ">
                                <span className="w-5 h-5">
                                    <Spinner />
                                </span>{' '}
                                Asteapta
                            </p>
                        ) : (
                            'Salvati'
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
