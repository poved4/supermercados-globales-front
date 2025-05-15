import { map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageServiceService } from './local-storage-service.service';
import { environment as env } from '../../environments/environment';
import { OrderStatus } from '../interfaces/order-status';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  private http = inject(HttpClient);
  private storage = inject(LocalStorageServiceService);

  private get(): Observable<OrderStatus[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<OrderStatus[]>(
      `${env.apiUrl}/api/v1/orders/status`,
      { headers }
    );

  }

  getAll(): Observable<OrderStatus[]> {

    const savedData = this.storage.getItem(env.storage.orderStatus);
    if (savedData !== null && savedData.length > 0) {
      return of(JSON.parse(savedData));
    }

    return this.get()
      .pipe(
        tap(data => {
          if (data.length > 0) {
            this.storage.setItem(env.storage.orderStatus, JSON.stringify(data));
          }
        })
      );

  }

  getById(id: number): Observable<OrderStatus | undefined> {

    return this.getAll()
      .pipe(
        map(item =>
          item.find(x => x.id === id)
        )
      );

  }

}
