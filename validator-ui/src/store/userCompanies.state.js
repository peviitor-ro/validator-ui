import { create } from 'zustand';

export const INITIAL_USER_COMPANIES_STATE = {
    is_superuser: false,
    is_staff: false,
    users: [],
    companies: [],
    scrapers: [],
};

export const useUserCompaniesStore = create((set) => ({
    ...INITIAL_USER_COMPANIES_STATE,
    setIsSuperuser: (is_superuser) => set(() => ({ is_superuser: is_superuser })),
    setIsStaff: (is_staff) => set(() => ({ is_staff: is_staff })),
    setUsers: (users) => set(() => ({ users: users })),
    setCompanies: (companies) => set(() => ({ companies: companies })),
    setScrapers: (scrapers) => set(() => ({ scrapers: scrapers })),
}));
