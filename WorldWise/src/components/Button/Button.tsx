import styles from './Button.module.css';

type ButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: string;
    children: React.ReactNode;
};

export default function Button({ onClick, children, type }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${type ? styles[type] : null}`}>
            {children}
        </button>
    );
}
