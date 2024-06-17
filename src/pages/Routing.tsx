import { Suspense, lazy } from 'react';
import {  Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
    () => import('@/pages/Dashboard.tsx')
);
const DashboardPage = lazy(() => import('@/pages/dashboard/index.tsx'));
const ProductPage = lazy(() => import('@/pages/products/index.tsx'));
const CustomerPage = lazy(() => import('@/pages/customers/index.tsx'));

// ----------------------------------------------------------------------

export default function AppRouter() {
    const dashboardRoutes = [
        {
            path: '/',
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                {
                    element: <DashboardPage />,
                    index: true
                },
                {
                    path: 'product',
                    element: <ProductPage />
                },
                {
                    path: 'customer',
                    element: <CustomerPage />
                }
            ]
        }
    ];


    const routes = useRoutes([...dashboardRoutes]);

    return routes;
}
