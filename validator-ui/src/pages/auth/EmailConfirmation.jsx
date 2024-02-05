export function EmailConfirmation() {
    //todo check user email

    return (
        <div className="flex items-center justify-center flex-col gap-3 h-screen bg-container">
            <h1 className="text-3xl font-bold">Please check your email</h1>
            <p className="text-subtitle">
                If you don&apos;t see it in your inbox, don&apos;t forget to check your spam folder
            </p>

            <a
                href="https://mail.google.com/mail"
                className="bg-primary py-1 px-3 rounded-md mt-4 text-card"
                target="blank"
            >
                Open Email
            </a>
        </div>
    );
}
