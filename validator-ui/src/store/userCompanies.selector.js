import { useUserCompaniesStore } from './userCompanies.state';

export function useUserCompaniesSelector() {
    const is_superuser = useUserCompaniesStore((state) => state.is_superuser);
    const is_staff = useUserCompaniesStore((state) => state.is_staff);
    const users = useUserCompaniesStore((state) => state.users);
    const companies = useUserCompaniesStore((state) => state.companies);
    const setIsSuperuser = useUserCompaniesStore((state) => state.setIsSuperuser);
    const setIsStaff = useUserCompaniesStore((state) => state.setIsStaff);
    const setUsers = useUserCompaniesStore((state) => state.setUsers);
    const setCompanies = useUserCompaniesStore((state) => state.setCompanies);

    return {
        is_superuser,
        is_staff,
        users,
        companies,
        setIsSuperuser,
        setIsStaff,
        setUsers,
        setCompanies,
    };
}
