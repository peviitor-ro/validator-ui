import { Template } from './Authorize';
import * as UnauthorizedStories from './Unautorized.stories';
import Loading from '../../components/Loading';
import { BrowserRouter } from 'react-router-dom';
export default {
    title: 'Pages/Authorize',
    component: Template,
    parameters: {
        layout: 'fullscreen',
    },
};

export const onLoading = (args) => <Template {...args} />;
onLoading.args = {
    icon: <Loading />,
    titleText: 'Incarcare',
    descriptionText: 'Va dura doar un moment',
};

export const onError = (args) => <UnauthorizedStories.Default {...args} />;
onError.parameters = {
    layout: 'fullscreen',
};
onError.decorators = [
    (Story) => (
        <BrowserRouter>
            <Story />
        </BrowserRouter>
    ),
];
onError.args = {
    icon: UnauthorizedStories.Default.args.icon,
    title: UnauthorizedStories.Default.args.title,
    description: UnauthorizedStories.Default.args.description,
    link: UnauthorizedStories.Default.args.link,
};




