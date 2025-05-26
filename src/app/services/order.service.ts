import { Observable } from 'rxjs';
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

  public getOrdersByBranch(id: number): Observable<Order[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Order[]>(
      `${env.apiUrl}/api/v1/orders/branch/${id}`,
      { headers }
    );

  }

}
