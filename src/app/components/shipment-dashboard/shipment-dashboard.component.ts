import { Component } from '@angular/core';

import { CreateShipmentComponent } from '../create-shipment/create-shipment.component';
import { ListShipmentsComponent } from '../list-shipments/list-shipments.component';

@Component({
  selector: 'app-shipment-dashboard',
  standalone: true,
  imports: [CreateShipmentComponent, ListShipmentsComponent],
  templateUrl: './shipment-dashboard.component.html',
  styleUrl: './shipment-dashboard.component.scss',
})
export class ShipmentDashboardComponent {
  refreshCount = 0;

  onShipmentCreated(): void {
    this.refreshCount++;
  }
}
