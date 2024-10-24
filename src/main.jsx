import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import HomePage from './pages/HomePage/HomePage.jsx';
import LibraryPage from './pages/LibraryPage/LibraryPage.jsx';
import NotFoundErrorPage from './pages/NotFoundErrorPage/NotFoundErrorPage.jsx';
import Root from './components/Root/Root.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        // errorElement: <NotFoundErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
            // errorElement: <NotFoundErrorPage />,
          },
          {
            // Exercise Library
            path: 'exercises',
            element: <LibraryPage />,
            // loader: contactLoader,
            // action: contactAction,
          },
          // {
          //   // Create Workout
          //   path: 'create',
          //   element: <WorkoutCreatorPage />,
          //   // loader: contactLoader,
          //   // action: contactAction,
          // },
          // {
          //   // Exercise Library
          //   path: 'exercises/:exerciseId',
          //   element: <Exercise />,
          //   // loader: contactLoader,
          //   // action: contactAction,
          // },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
