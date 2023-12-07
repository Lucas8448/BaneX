import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./pages/Root";
import ErrorView from "./pages/ErrorView";
import Home from "./pages/Home";
import LocationsPage from "./pages/Locations/LocationsPage";
import Booking from "./pages/Booking/Booking";
import ManualBooking from "./pages/Booking/ManualBooking";
import ConfirmBooking from "./pages/Booking/ConfirmBooking";
import Reservations from "./pages/Reservations/Reservations";
import Receipts from "./pages/Receipts/Receipts";
import Receipt from "./pages/Receipts/Receipt";

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
      { path: "", element: <Home /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "booking/:station_ids", element: <Booking /> },
      { path: "booking/manual", element: <ManualBooking /> },
      { path: "booking/confirm", element: <ConfirmBooking /> },
      { path: "reservations", element: <Reservations /> },
      { path: "receipts", element: <Receipts /> },
      { path: "receipts/:receiptId", element: <Receipt /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}