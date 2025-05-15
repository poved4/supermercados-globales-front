import { map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageServiceService } from './local-storage-service.service';
import { environment as env } from '../../environments/environment';
import { OrderDetail } from '../interfaces/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private http = inject(HttpClient);
  private storage = inject(LocalStorageServiceService);

  getByOrderId(id: number): Observable<OrderDetail[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<OrderDetail[]>(
      `${env.apiUrl}/api/v1/orders/${id}/details`,
      { headers }
    );

  }

  // getAll(): Observable<OrderDetail[]> {

  //   const savedData = this.storage.getItem(env.storage.brach);
  //   if (savedData !== null && savedData.length > 0) {
  //     return of(JSON.parse(savedData));
  //   }

  //   return this.get()
  //     .pipe(
  //       tap(data => {
  //         if (data.length > 0) {
  //           this.storage.setItem(env.storage.brach, JSON.stringify(data));
  //         }
  //       })
  //     );

  // }

  // getById(id: number): Observable<OrderDetail | undefined> {

  //   return this.getAll()
  //     .pipe(
  //       map(item =>
  //         item.find(x => x.id === id)
  //       )
  //     );

  // }

}
