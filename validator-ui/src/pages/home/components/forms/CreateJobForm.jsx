import { useMemo, useState } from 'react';
import { post } from '../../../../services/landing/landing.service';
import { routes } from '../../../../routes/routes';
import { Button } from '../../../../components/Button';

function splitCommaSeparatedValue(value) {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function getDefaultExpirationValue() {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    date.setHours(23, 59, 0, 0);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export function CreateJobForm({ companyId, companyName, setJobsData, setOpenModal, setAlert }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        job_title: '',
        description: '',
        country: 'Romania',
        city: '',
        county: '',
        remote: ['remote'],
        salary_min: '',
        salary_max: '',
        salary_currency: '',
        expires_at: getDefaultExpirationValue(),
    });

    const fieldClassName =
        'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20';

    const textareaClassName =
        'min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20';

    const remoteValue = useMemo(() => formData.remote, [formData.remote]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleRemoteChange = (event) => {
        const value = Array.from(event.target.selectedOptions, (option) => option.value).filter(Boolean);
        setFormData((prev) => ({ ...prev, remote: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!formData.job_title.trim()) {
            setError('Titlul jobului este obligatoriu');
            return;
        }

        if (!formData.expires_at) {
            setError('Data expirarii este obligatorie');
            return;
        }

        setLoading(true);

        const payload = [
            {
                job_title: formData.job_title.trim(),
                description: formData.description.trim(),
                country: splitCommaSeparatedValue(formData.country),
                city: splitCommaSeparatedValue(formData.city),
                county: splitCommaSeparatedValue(formData.county),
                remote: formData.remote,
                salary_min: formData.salary_min === '' ? null : Number(formData.salary_min),
                salary_max: formData.salary_max === '' ? null : Number(formData.salary_max),
                salary_currency: formData.salary_currency,
                companyId,
                company: companyName,
                expires_at: new Date(formData.expires_at).toISOString(),
            },
        ];

        try {
            const response = await post(routes.JOBS_MANUAL_ADD, payload);
            const createdJob = response.data?.[0];

            setJobsData((prev) => [
                {
                    ...createdJob,
                    company: companyName,
                    country: payload[0].country,
                    city: payload[0].city,
                    county: payload[0].county,
                    remote: payload[0].remote.join(','),
                    salary_min: payload[0].salary_min,
                    salary_max: payload[0].salary_max,
                    salary_currency: payload[0].salary_currency,
                    edited: false,
                    published: false,
                    posted: false,
                    companyId,
                },
                ...prev,
            ]);
            setOpenModal(false);
            setAlert('Jobul a fost creat cu succes', 'success');
        } catch (submitError) {
            setError(submitError?.response?.data?.expires_at?.[0] || 'A aparut o eroare la crearea jobului');
            setAlert('A aparut o eroare la crearea jobului', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="border-b border-slate-200 pb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Job nou
                </p>
                <h2 className="text-2xl font-semibold text-slate-800">Adauga job</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Creeaza manual un job pentru compania {companyName}.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="job_title" className="text-sm font-medium text-slate-600">
                    Titlu job
                </label>
                <input
                    id="job_title"
                    className={fieldClassName}
                    value={formData.job_title}
                    onChange={handleChange}
                    placeholder="Ex: Frontend Developer"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-slate-600">
                    Descriere
                </label>
                <textarea
                    id="description"
                    className={textareaClassName}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descrierea jobului care va fi afisata in pagina dedicata"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="country" className="text-sm font-medium text-slate-600">
                        Tara
                    </label>
                    <input
                        id="country"
                        className={fieldClassName}
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Romania"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="expires_at" className="text-sm font-medium text-slate-600">
                        Expira la
                    </label>
                    <input
                        id="expires_at"
                        type="datetime-local"
                        className={fieldClassName}
                        value={formData.expires_at}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="salary_min" className="text-sm font-medium text-slate-600">
                        Salariu minim
                    </label>
                    <input
                        id="salary_min"
                        type="number"
                        min="0"
                        className={fieldClassName}
                        value={formData.salary_min}
                        onChange={handleChange}
                        placeholder="Ex: 5000"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="salary_max" className="text-sm font-medium text-slate-600">
                        Salariu maxim
                    </label>
                    <input
                        id="salary_max"
                        type="number"
                        min="0"
                        className={fieldClassName}
                        value={formData.salary_max}
                        onChange={handleChange}
                        placeholder="Ex: 8000"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="salary_currency" className="text-sm font-medium text-slate-600">
                        Moneda
                    </label>
                    <select
                        id="salary_currency"
                        className={fieldClassName}
                        value={formData.salary_currency}
                        onChange={handleChange}
                    >
                        <option value="">Selecteaza moneda</option>
                        <option value="EUR">EURO</option>
                        <option value="RON">RON</option>
                        <option value="USD">USD</option>
                        <option value="VOLUNTAR">Voluntar</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="city" className="text-sm font-medium text-slate-600">
                        Orase
                    </label>
                    <textarea
                        id="city"
                        className={textareaClassName}
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Bucuresti, Cluj-Napoca"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="county" className="text-sm font-medium text-slate-600">
                        Judete
                    </label>
                    <textarea
                        id="county"
                        className={textareaClassName}
                        value={formData.county}
                        onChange={handleChange}
                        placeholder="Bucuresti, Cluj"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="remote" className="text-sm font-medium text-slate-600">
                    Tip job
                </label>
                <select
                    id="remote"
                    multiple
                    className="h-32 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    value={remoteValue}
                    onChange={handleRemoteChange}
                >
                    <option value="remote">remote</option>
                    <option value="on-site">on-site</option>
                    <option value="hybrid">hybrid</option>
                </select>
            </div>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <Button
                text="Creeaza job"
                isLoading={loading}
                className="inline-flex min-w-[180px] items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            />
        </form>
    );
}
