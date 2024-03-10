import { useJobStore } from './job.state';

export function useJobSelector () {
    const job_title = useJobStore((state) => state.job_title);
    const job_link = useJobStore((state) => state.job_link);
    const city = useJobStore((state) => state.city);
    const county = useJobStore((state) => state.county);
    const country = useJobStore((state) => state.country);
    const remote = useJobStore((state) => state.remote);
    
    return { job_title, job_link, city, county, country, remote };

}
