import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { ProfitService } from '../../core/services/profit.service';
import { ProfitCalculation } from '../../core/models/profit-calculation.model';

@Component({
  selector: 'app-list-shipments',
  standalone: true,
  imports: [DecimalPipe, MatTableModule, MatProgressSpinnerModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './list-shipments.component.html',
  styleUrl: './list-shipments.component.scss',
})
export class ListShipmentsComponent implements OnInit, OnChanges {
  private readonly profitService = inject(ProfitService);

  @Input() refresh = 0;

  shipments: ProfitCalculation[] = [];
  totalCount = 0;
  loading = false;
  errorMessage = '';
  pageIndex = 0;
  pageSize = 10;

  readonly displayedColumns = ['shipmentRef', 'totalIncome', 'totalCosts', 'profitOrLoss'];

  ngOnInit(): void {
    this.loadShipments();
  }

  ngOnChanges(): void {
    if (this.refresh > 0) {
      this.pageIndex = 0;
      this.loadShipments();
    }
  }

  onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadShipments();
  }

  loadShipments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.profitService.getAll(this.pageIndex, this.pageSize).subscribe({
      next: (page) => {
        this.shipments = page.content;
        this.totalCount = page.totalElements;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Failed to load shipments.';
        this.loading = false;
      },
    });
  }
}
