import { Spinner } from '../../components/Spinner';
import { addUser } from '../../services/landing/landing.service';
import { Alert } from '../../components/Alert';

export function AccountForm({ loading, setLoading, alertMessage, setAlertMessage }) {
    const handleClick = async () => {
        setLoading(true);
        try {
            const email = document.getElementById('email_account').value;
            const response = await addUser(email);
            if (response === 201) {
                setLoading(false);
                window.location.reload();
            }
            setAlertMessage('A aparut o eroare');
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            {alertMessage && <Alert message={alertMessage} type="error" />}
            <div className="flex flex-col gap-4 m-2 p-2 border bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-500 border-b-2 pb-2">
                    Adaugare cont
                </h2>
                <form className="flex flex-col gap-4 text-gray-500">
                    <div>
                        <label htmlFor="email_account">Adauga Utilizator</label>
                        <input
                            type="email"
                            id="email_account"
                            className="border-input h-full w-full p-2"
                            placeholder="Email"
                        />
                    </div>
                    <button
                        className="flex items-center justify-center btn btn-green text-center w-[100px] px-4"
                        onClick={handleClick}
                        disabled={loading}
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
