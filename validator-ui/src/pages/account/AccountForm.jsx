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
            <div className="rounded-[28px] border border-white/60 bg-white/90 p-5 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md lg:p-6">
                <div className="mb-5 border-b border-slate-200 pb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Superuser
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-800">Adaugare cont</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Creeaza rapid un utilizator nou care va putea primi acces la companii.
                    </p>
                </div>
                <form className="flex flex-col gap-5 text-slate-600" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email_account" className="text-sm font-medium text-slate-600">
                            Adauga utilizator
                        </label>
                        <input
                            type="email"
                            id="email_account"
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
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
