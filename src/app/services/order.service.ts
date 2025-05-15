import { map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageServiceService } from './local-storage-service.service';
import { environment as env } from '../../environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private storage = inject(LocalStorageServiceService);

  private get(): Observable<Order[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Order[]>(
      `${env.apiUrl}/api/v1/orders`,
      { headers }
    );

  }

  getAll(): Observable<Order[]> {

    const savedData = this.storage.getItem(env.storage.order);
    if (savedData !== null && savedData.length > 0) {
      return of(JSON.parse(savedData));
    }

    return this.get()
      .pipe(
        tap(data => {
          if (data.length > 0) {
            this.storage.setItem(env.storage.order, JSON.stringify(data));
          }
        })
      );

  }

  getById(id: number): Observable<Order | undefined> {

    return this.getAll()
      .pipe(
        map(item =>
          item.find(x => x.id === id)
        )
      );

  }


}
