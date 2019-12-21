import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Joke } from "../models";

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll({
      page = 1,
      limit = environment.limit,
      search = ''
  }) {
      return this.http.get(`${this.apiUrl}/jokes?page=${page}&limit=${limit}&search=${search}`);
  }

  findOne(id: string) {
      return this.http.get(`${this.apiUrl}/jokes/${id}`);
  }

  create(joke: Joke) {
    return this.http.post(`${this.apiUrl}/jokes`, joke);
  }

  update(joke: Joke) {
    return this.http.put(`${this.apiUrl}/jokes/${joke._id}`, joke);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/jokes/${id}`);
  }
}
