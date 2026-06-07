import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingPage } from '../../components/LoadingPage';
import Loading from '../../components/Loading';
import { PRIVATE_API, PUBLIC_API } from '../../services/Api';
import { routes } from '../../routes/routes';

function formatSalary(job) {
    const currency = job.salary_currency ? String(job.salary_currency).trim().toUpperCase() : '';

    if (currency === 'VOLUNTAR') {
        return 'Voluntar';
    }

    const min = normalizeSalary(job.salary_min);
    const max = normalizeSalary(job.salary_max);

    if (min !== null && max !== null) {
        return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`.trim();
    }

    if (min !== null) {
        return `${formatNumber(min)} ${currency}`.trim();
    }

    if (max !== null) {
        return `${formatNumber(max)} ${currency}`.trim();
    }

    return 'Nu este precizat';
}

function normalizeSalary(value) {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? null : numericValue;
}

function formatNumber(value) {
    return new Intl.NumberFormat('ro-RO').format(value);
}

function formatList(value, emptyLabel) {
    if (!value) {
        return emptyLabel;
    }

    if (Array.isArray(value)) {
        return value.length ? value.join(', ') : emptyLabel;
    }

    return String(value)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .join(', ') || emptyLabel;
}

export function JobDetailsPage() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadJob() {
            setLoading(true);
            setError('');

            try {
                const response = await PUBLIC_API.get(`${routes.MOBILE_JOB_DETAIL}${jobId}/`);
                if (isMounted) {
                    setJob(response.data);
                }
            } catch (requestError) {
                const hasAuthToken = Boolean(JSON.parse(localStorage.getItem('validator') || 'null')?.accessToken);

                if (hasAuthToken) {
                    try {
                        const response = await PRIVATE_API.get(`${routes.JOBS_DETAIL}${jobId}/`);
                        if (isMounted) {
                            setJob(response.data);
                            return;
                        }
                    } catch {
                        // Fallback below keeps the error generic.
                    }
                }

                if (isMounted) {
                    if (!hasAuthToken) {
                        navigate(`/${routes.LOGIN}?redirect=${encodeURIComponent(`/job/${jobId}`)}`, {
                            replace: true,
                        });
                        return;
                    }

                    setError('Jobul nu a fost gasit');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadJob();

        return () => {
            isMounted = false;
        };
    }, [jobId, navigate]);

    if (loading) {
        return (
            <LoadingPage message="Se incarca jobul">
                <Loading />
            </LoadingPage>
        );
    }

    if (error || !job) {
        return (
            <div className="mx-4 rounded-[28px] border border-white/60 bg-white/90 p-6 text-slate-700 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md lg:mx-6">
                <p className="text-lg font-semibold">{error || 'Jobul nu a fost gasit'}</p>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                    Inapoi
                </button>
            </div>
        );
    }

    return (
        <main className="mx-4 flex flex-col gap-6 pb-6 lg:mx-6">
            <section className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md lg:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                            Detalii job
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{job.job_title}</h1>
                        <p className="mt-2 text-sm text-slate-500">{job.company_name}</p>
                    </div>
                    <Link
                        to="/"
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Inapoi la companii
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard label="Salariu" value={formatSalary(job)} />
                    <InfoCard label="Tara" value={formatList(job.country, 'Nu este precizat')} />
                    <InfoCard label="Orase" value={formatList(job.city, 'Nu este precizat')} />
                    <InfoCard label="Tip job" value={formatList(job.remote, 'Nu este precizat')} />
                </div>
            </section>

            <section className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md lg:p-8">
                <div className="border-b border-slate-200 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Descriere
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Despre acest rol</h2>
                </div>

                <DescriptionRenderer description={job.description} />
            </section>
        </main>
    );
}

function DescriptionRenderer({ description }) {
    const sections = useMemo(() => {
        if (!description?.trim()) {
            return null;
        }

        const knownTitles = [
            'Descrierea meseriei',
            'Responsabilități',
            'Responsabilitati',
            'Cerințe',
            'Cerinte',
            'Ce oferim',
            'Alte informații (opțional)',
            'Alte informatii (optional)',
        ];

        const lines = description.split('\n');
        const result = [];
        let currentSection = null;

        for (const line of lines) {
            const trimmed = line.trim();
            const isTitle = knownTitles.includes(trimmed) || trimmed.endsWith(':');

            if (isTitle && !trimmed.startsWith('-') && !trimmed.startsWith('•') && !trimmed.startsWith('*')) {
                currentSection = { title: trimmed, items: [] };
                result.push(currentSection);
            } else if (currentSection) {
                currentSection.items.push(line);
            } else {
                currentSection = { title: null, items: [line] };
                result.push(currentSection);
            }
        }

        return result;
    }, [description]);

    if (!sections) {
        return (
            <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-600 select-text">
                {'Descrierea va fi completata din admin.'}
            </div>
        );
    }

    return (
        <div className="mt-5 space-y-6 text-sm leading-7 text-slate-600 select-text">
            {sections.map((section, idx) => (
                <div key={idx}>
                    {section.title && (
                        <h3 className="mb-3 text-base font-bold text-slate-800">
                            {section.title}
                        </h3>
                    )}
                    <div className="space-y-1.5">
                        {section.items.map((line, lineIdx) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <div key={lineIdx} className="h-1.5" />;

                            const bulletMatch = trimmed.match(/^[-•*]\s*/);
                            if (bulletMatch) {
                                const text = trimmed.slice(bulletMatch[0].length);
                                return (
                                    <div key={lineIdx} className="flex items-baseline gap-2.5 pl-1">
                                        <span className="text-slate-400 shrink-0">•</span>
                                        <span className="flex-1">{text}</span>
                                    </div>
                                );
                            }

                            return <p key={lineIdx}>{trimmed}</p>;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-2 text-sm font-medium text-slate-700">{value}</p>
        </div>
    );
}
