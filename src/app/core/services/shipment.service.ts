import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Page } from '../models/page.model';
import { Shipment } from '../models/shipment.model';

/**
 * Service responsible for all CRUD operations on Shipment resources.
 *
 * Follows the Single Responsibility Principle — this service only handles
 * HTTP communication with the {@code /api/shipments} endpoint. Business
 * logic and state management belong in components or dedicated facades.
 *
 * Provided in root so a single instance is shared across the application
 * (Open/Closed Principle — extend behaviour via composition, not inheritance).
 */
@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private readonly http = inject(HttpClient);

  /** Base URL for the shipments REST endpoint. */
  private readonly baseUrl = `${environment.apiBaseUrl}/api/shipments`;

  /**
   * Retrieves a paginated list of all shipments.
   *
   * @param page Zero-based page index (default: 0).
   * @param size Number of items per page (default: 20).
   * @returns Observable emitting a {@link Page} of {@link Shipment} objects.
   */
  getAll(page = 0, size = 20): Observable<Page<Shipment>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http
      .get<ApiResponse<Page<Shipment>>>(this.baseUrl, { params })
      .pipe(map((response) => response.data));
  }

  /**
   * Retrieves a single shipment by its database identifier.
   *
   * @param id The shipment's primary key.
   * @returns Observable emitting the matching {@link Shipment}.
   */
  getById(id: number): Observable<Shipment> {
    return this.http
      .get<ApiResponse<Shipment>>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Creates a new shipment with its associated incomes and costs.
   *
   * @param shipment The shipment payload to persist.
   * @returns Observable emitting the created {@link Shipment} (with server-assigned id).
   */
  create(shipment: Shipment): Observable<Shipment> {
    return this.http
      .post<ApiResponse<Shipment>>(this.baseUrl, shipment)
      .pipe(map((response) => response.data));
  }

}
