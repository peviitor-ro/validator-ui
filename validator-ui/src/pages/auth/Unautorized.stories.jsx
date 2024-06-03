import { Template } from "./Unautorized";
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'Pages/Unautorized',
    component: Template,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

export const Default = (args) => <Template {...args} />;
Default.args = {
    icon: <LockClosedIcon />,
    title: 'Acces neautorizat',
    description:
        'Ne pare rău, dar nu aveți permisiunea de a accesa conținutul solicitat. Vă rugăm să vă asigurați că sunteți autentificat cu contul corect.',
    link: { to: '#', text: 'Înapoi la autentificare' },
};