import React, { useEffect, useState } from 'react';
import { useCompaniesInfiniteQuery } from '../../services/landing/landing.queries';
import { useCompanyOptionsSelector } from '../../store/company.selectors';
import { infiniteScroll } from '../../hooks/infiniteScroll';
import { LoadingPage } from '../../components/LoadingPage';
import { Alert } from '../../components/Alert';
import { Home } from './components/filters/HeaderFilters';
import { NoResultFound } from './components/NoResultFound';
import { CompanyCard } from './components/cards/CompanyCard';
import { CompanyForm } from './components/forms/CompanyForm';
import { SORT_OPTIONS } from './components/filters/constants';
import useWindowSize from '../../hooks/useWindowSize';
import Loading from '../../components/Loading';
import { Modal } from '../../components/Modal';

/**
 * The Homepage component is responsible for rendering the main page of the application.
 * It handles infinite scrolling to load company data and displays it in a grid layout.
 *
 * @component
 * @returns {JSX.Element} The rendered Homepage component.
 *
 * @example
 * return (
 *   <Homepage />
 * )
 */
export function Homepage() {
    const { width } = useWindowSize();

    // Destructure the result of the `infiniteScroll` function call
    const { data, status, error, button } = infiniteScroll(
        useCompanyOptionsSelector,
        useCompaniesInfiniteQuery,
        'Se incarca mai multe companii',
        'Se incarca mai multe companii',
        'Nu mai sunt companii de incarcat',
        getPageSize(width),
    );

    // State hook to manage the list of companies
    const [companies, setCompanies] = useState([]);

    // State hooks for alert message and type
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    // Update the companies list when the data changes
    useEffect(() => {
        if (data?.pages[0].data?.length > 0) {
            setCompanies(data.pages.map((page) => page.data).flat());
        }
    }, [data]);

    const [editedData, setEditedData] = useState({});
    const [openModal, setOpenModal] = useState(false);

    if (status === 'error') {
        return (
            <LoadingPage message={error.message}>
                <Loading lst={[{ name: 'user' }, { name: 'validator-error' }]} />
            </LoadingPage>
        );
    }

    return (
        <Home>
            <Home.Header
                title={'Companii'}
                formComponent={
                    <CompanyForm
                        setCompanies={setCompanies}
                        setAlertOpen={setAlertOpen}
                        setAlertMessage={setAlertMessage}
                        setAlertType={setAlertType}
                    />
                }
                selector={useCompanyOptionsSelector}
                options={SORT_OPTIONS}
            />

            <Alert
                message={alertMessage}
                type={alertType}
                visible={alertOpen}
                setVisible={setAlertOpen}
            />

            {status === 'pending' ? (
                <LoadingPage message={'Se incarca companiile'}>
                    <Loading />
                </LoadingPage>
            ) : (
                <>
                    {!data?.pages[0].data?.length ? (
                        <NoResultFound />
                    ) : (
                        <>
                            <div className="grid grid-cols-minmax gap-6 px-4 lg:px-6">
                                {companies.map((company, index) => {
                                    const uniqueKey = `company_${index}`;
                                    return (
                                        <CompanyCard
                                            key={uniqueKey}
                                            data={company}
                                            setCompanies={setCompanies}
                                            setAlertOpen={setAlertOpen}
                                            setAlertMessage={setAlertMessage}
                                            setAlertType={setAlertType}
                                            setEditedData={setEditedData}
                                            setOpenModal={setOpenModal}
                                        />
                                    );
                                })}
                            </div>
                            {button}
                        </>
                    )}
                </>
            )}
            <Modal open={openModal} setOpen={setOpenModal}>
                <CompanyForm
                    companyData={editedData}
                    method="PUT"
                    setCompanies={setCompanies}
                    setAlertOpen={setAlertOpen}
                    setAlertMessage={setAlertMessage}
                    setAlertType={setAlertType}
                />
            </Modal>
        </Home>
    );
}

/**
 * Determines the page size based on the given width.
 *
 * @param {number} width - The width of the viewport.
 * @returns {number} The page size corresponding to the given width.
 */
function getPageSize(width) {
    if (width < 576) {
        return 5;
    } else if (width < 768) {
        return 10;
    } else if (width < 1024) {
        return 15;
    }

    return 20;
}
