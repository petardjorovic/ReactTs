import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './PageNav.module.css';

export default function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul className={styles.nav}>
                <li>
                    <NavLink to={'/product'}>Product</NavLink>
                </li>
                <li>
                    <NavLink to={'/pricing'}>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to={'/login'} className={styles.ctaLink}>
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
