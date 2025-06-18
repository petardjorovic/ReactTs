import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/FakeAuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : null;
}
