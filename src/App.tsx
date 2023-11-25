import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./pages/Root";
import ErrorView from "./pages/ErrorView";
import Home from "./pages/Home";
import LocationsPage from "./pages/Locations/LocationsPage";
import Booking from "./pages/Booking/Booking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 20,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "",
        element: <Home />,
      }
    ],
  },
  {
    path: "/locations",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "",
        element: <LocationsPage />,
      }
    ],
  },
  {
    path: "/booking",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "",
        element: <Booking />,
      }
    ],
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
