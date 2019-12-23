import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Joke, Pagination } from '../models';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll({
    page = 1,
    limit = environment.limit,
    search = ''
  }):Observable<Pagination> {
    return this.http.get<Pagination>(`${this.apiUrl}/jokes?page=${page}&limit=${limit}&search=${search}`);
  }

  findOne(id: string):Observable<Joke> {
    return this.http.get<Joke>(`${this.apiUrl}/jokes/${id}`);
  }

  create(joke: Joke):Observable<Joke> {
    return this.http.post<Joke>(`${this.apiUrl}/jokes`, joke);
  }

  update(joke: Joke):Observable<Joke> {
    return this.http.put<Joke>(`${this.apiUrl}/jokes/${joke._id}`, joke);
  }

  delete(id: string):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/jokes/${id}`);
  }
}
