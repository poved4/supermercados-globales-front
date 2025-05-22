import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageServiceService } from './local-storage-service.service';
import { environment as env } from '../../environments/environment';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private http = inject(HttpClient);
  private storage = inject(LocalStorageServiceService);

  getById(id: number): Observable<Inventory[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Inventory[]>(
      `${env.apiUrl}/api/v1/inventory/branch/${id}`,
      { headers }
    );

  }

}
