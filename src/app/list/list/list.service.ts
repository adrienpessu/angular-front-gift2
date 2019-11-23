import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  getGifts(childId: string) {
    return this.http.get<ItemList[]>(`${environment.apiUrl}/presents/${childId}`, httpOptions);
  }

  postGift(item: ItemList) {
    return this.http.post<ItemList>(`${environment.apiUrl}/present`, item, httpOptions);
  }

  putGift(item: ItemList) {
    return this.http.put<ItemList>(`${environment.apiUrl}/present`, item, httpOptions);
  }

  deleteGift(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}/present/${id}`, httpOptions);
  }

}
