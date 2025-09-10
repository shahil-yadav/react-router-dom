import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './error-page';
import Contact from './routes/contacts.jsx';
import { action as contactAction,loader as contactLoader } from "./routes/contacts.jsx"
import { action as destroyAction } from "./routes/destroy";
import EditContact, {
  action as editAction
} from "./routes/edit.jsx"
import Index from './routes/index.jsx';
import Root, { action as rootAction,loader as rootLoader } from "./routes/root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            loader: contactLoader,
            action: contactAction,
            element: <Contact />,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
          },
        ]
      }
    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
