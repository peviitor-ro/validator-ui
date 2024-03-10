
import { create } from 'zustand';

const INITIAL_JOB_STATE = {
    job_title: '',
    job_link: '',
    city: [],
    county: [],
    country: ['Romania'],
    remote: [],
    published: false,
    edited: false,
    deleted: false,
};

export const useJobStore = create((set) => ({
    ...INITIAL_JOB_STATE,
    setJob: (job) => set(() => ({ ...job })),
    reset: () => set(() => ({ ...INITIAL_JOB_STATE })),
}));