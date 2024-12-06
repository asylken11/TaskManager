import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'https://67499097868020296631a354.mockapi.io/taskmanager';

  constructor(
    private http: HttpClient,
  ) { }

  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, { params: new HttpParams({ fromObject: params }) });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body);
  }

  delete<T>(url: string, params?: any): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url, { params: new HttpParams({ fromObject: params }) });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, body);
  }
}
