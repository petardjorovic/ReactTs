import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import Logo from '../Logo/Logo';
import styles from './Sidebar.module.css';
import type { City } from '../../layouts/AppLayout/AppLayout';

export type SidebarProps = {
    cities: City[];
    isLoading: boolean;
};

export default function Sidebar({ cities, isLoading }: SidebarProps) {
    const contextValue: SidebarProps = {
        cities,
        isLoading,
    };

    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <Outlet context={contextValue} />

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
            </footer>
        </div>
    );
}
