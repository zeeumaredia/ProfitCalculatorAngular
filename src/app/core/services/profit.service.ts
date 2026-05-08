import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Page } from '../models/page.model';
import { ProfitCalculation } from '../models/profit-calculation.model';

@Injectable({ providedIn: 'root' })
export class ProfitService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiBaseUrl}/api/shipments`;

  calculate(shipmentId: number): Observable<ProfitCalculation> {
    return this.http
      .get<ApiResponse<ProfitCalculation>>(`${this.baseUrl}/${shipmentId}/profit`)
      .pipe(map((response) => response.data));
  }

  getAll(page = 0, size = 20): Observable<Page<ProfitCalculation>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http
      .get<ApiResponse<Page<ProfitCalculation>>>(`${this.baseUrl}/profit`, { params })
      .pipe(map((response) => response.data));
  }
}
