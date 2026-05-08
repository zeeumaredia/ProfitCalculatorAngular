import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shipments',
    pathMatch: 'full',
  },
  {
    path: 'shipments',
    loadComponent: () =>
      import(
        './components/shipment-dashboard/shipment-dashboard.component'
      ).then((m) => m.ShipmentDashboardComponent),
  },
  {
    path: '**',
    redirectTo: 'shipments',
  },
];
