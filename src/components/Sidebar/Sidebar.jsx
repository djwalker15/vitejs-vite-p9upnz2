import './Sidebar.css';
// import { Home, Apps, FitnessCenter } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div id="sidebar">
      <h1 className="tag">Stack Gen</h1>
      <div id="navigation">
        <nav>
          <ul>
            <li>
              <NavLink to={`/`}>
                {/* <Home /> */}
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/exercises`}>
                {/* <Apps /> */}
                <span>Exercise Library</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/create`}>
               
                <span>Workout Creator</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/newCreate`}>
               
                <span>New Workout Creator</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {/* <SiteNav /> */}
    </div>
  );
}
