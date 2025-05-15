import { map, Observable, of, tap } from 'rxjs';
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

  private get(): Observable<Inventory[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Inventory[]>(
      `${env.apiUrl}/api/v1/inventory`,
      { headers }
    );

  }

  getAll(): Observable<Inventory[]> {

    const savedData = this.storage.getItem(env.storage.inventory);
    if (savedData !== null && savedData.length > 0) {
      return of(JSON.parse(savedData));
    }

    return this.get()
      .pipe(
        tap(data => {
          if (data.length > 0) {
            this.storage.setItem(env.storage.inventory, JSON.stringify(data));
          }
        })
      );

  }

  getById(id: number): Observable<Inventory | undefined> {

    return this.getAll()
      .pipe(
        map(item =>
          item.find(x => x.id === id)
        )
      );

  }

}
