import { Outlet } from 'react-router-dom';
import Menu from './Menu';

function Layout() {
  return (
    <div className="layout">
      <Menu />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;