import { Outlet } from 'react-router-dom';
import { Container } from '../../components/Container';
import { Header } from './components/Header';

export function AppLayout() {
    return (
        <Container className={"bg-background"}>
            <Header />
            <Outlet />
        </Container>
    );
}
