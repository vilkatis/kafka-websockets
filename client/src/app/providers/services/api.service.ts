import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IAddProductRequest {
  productName: string;
}

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private _http: HttpClient) {}

  addProduct(userId: string, request: IAddProductRequest) {
    return this._http.post(`/api/v1/users/${userId}/products`, request);
  }
}
