import { Outlet } from 'react-router-dom';
import './Root.css';
import Sidebar from '../Sidebar/Sidebar.jsx';

export default function Root() {
  return (
    <>
      <Sidebar />
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
