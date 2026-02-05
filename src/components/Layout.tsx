import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            BIGS TODO
          </Link>
          <nav className="nav">
            {user && (
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm"
                >
                  로그아웃
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
