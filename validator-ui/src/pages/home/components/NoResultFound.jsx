import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { GenericPage } from '../../../components/GenericPage';
import { useCompanyOptionsSelector } from '../../../store/company.selectors';

export function NoResultFound() {
    const { isEmpty, reset } = useCompanyOptionsSelector();

    return (
        <GenericPage className="min-h-max">
            <GenericPage.Symbol
                icon={
                    <svg
                        width="inherit"
                        height="inherit"
                        viewBox="0 -0.5 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.5 11.493C5.50364 8.39226 7.69698 5.72579 10.7388 5.12416C13.7807 4.52253 16.8239 6.15327 18.0077 9.0192C19.1915 11.8851 18.186 15.1881 15.6063 16.9085C13.0265 18.6288 9.59077 18.2874 7.4 16.093C6.18148 14.8725 5.49799 13.2177 5.5 11.493Z"
                            className="stroke-subtitle"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.062 16.568L19.5 19.993"
                            className="stroke-subtitle"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10.5303 8.96271C10.2374 8.66982 9.76256 8.66982 9.46967 8.96271C9.17678 9.25561 9.17678 9.73048 9.46967 10.0234L10.5303 8.96271ZM11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627L11.4697 12.0234ZM12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234L12.5303 10.9627ZM13.4697 14.0234C13.7626 14.3163 14.2374 14.3163 14.5303 14.0234C14.8232 13.7305 14.8232 13.2556 14.5303 12.9627L13.4697 14.0234ZM12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627L12.5303 12.0234ZM9.46967 12.9627C9.17678 13.2556 9.17678 13.7305 9.46967 14.0234C9.76256 14.3163 10.2374 14.3163 10.5303 14.0234L9.46967 12.9627ZM11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234L11.4697 10.9627ZM14.5303 10.0234C14.8232 9.73048 14.8232 9.25561 14.5303 8.96271C14.2374 8.66982 13.7626 8.66982 13.4697 8.96271L14.5303 10.0234ZM9.46967 10.0234L11.4697 12.0234L12.5303 10.9627L10.5303 8.96271L9.46967 10.0234ZM11.4697 12.0234L13.4697 14.0234L14.5303 12.9627L12.5303 10.9627L11.4697 12.0234ZM11.4697 10.9627L9.46967 12.9627L10.5303 14.0234L12.5303 12.0234L11.4697 10.9627ZM12.5303 12.0234L14.5303 10.0234L13.4697 8.96271L11.4697 10.9627L12.5303 12.0234Z"
                            className="fill-subtitle"
                        />
                    </svg>
                }
            />

            <GenericPage.Title text={isEmpty ? 'No company found' : 'No result found'} />
            <GenericPage.Description
                text={
                    isEmpty
                        ? "We can't find any assigned company"
                        : "We can't find any result with this set of filters"
                }
            />
            {!isEmpty && (
                <GenericPage.Action text="Reset filters" onClick={reset} icon={<ArrowPathIcon />} />
            )}
        </GenericPage>
    );
}
