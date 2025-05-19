import { map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageServiceService } from './local-storage-service.service';
import { environment as env } from '../../environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private storage = inject(LocalStorageServiceService);

  private get(): Observable<Product[]> {

    const token = this.storage.getItem(env.storage.accessToken);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Product[]>(
      `${env.apiUrl}/api/v1/products`,
      { headers }
    );

  }

  getAll(): Observable<Product[]> {

    const savedData = this.storage.getItem(env.storage.product);
    if (savedData !== null && savedData.length > 0) {
      return of(JSON.parse(savedData));
    }

    return this.get()
      .pipe(
        tap(data => {
          if (data.length > 0) {
            this.storage.setItem(env.storage.product, JSON.stringify(data));
          }
        })
      );

  }

  getById(id: number): Observable<Product | undefined> {

    return this.getAll()
      .pipe(
        map(item =>
          item.find(x => x.id === id)
        )
      );

  }

}
