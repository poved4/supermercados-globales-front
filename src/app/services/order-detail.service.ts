import { Observable } from 'rxjs';
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

}
