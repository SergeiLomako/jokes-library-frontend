import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Joke, Comment, User } from '../models';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    apiUrl: string = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        })
    };

    constructor(private httpClient: HttpClient) {}

    register(user: User) {
        return this.httpClient.post(`${this.apiUrl}/register`, user, this.httpOptions);
    }

    login(email: string, password: string) {
        return this.httpClient.post(`${this.apiUrl}/login`, { email, password }, this.httpOptions);
    }

    getAuthUserData() {
        return this.httpClient.get(`${this.apiUrl}/me`, this.httpOptions);
    }

    getJokes({
        page = 1,
        limit = environment.limit,
        search = ''
    }) {
        return this.httpClient.get(`${this.apiUrl}/jokes/page=${page}&limit=${limit}&search=${search}`, this.httpOptions);
    }

    getJokeById(id: string) {
        return this.httpClient.get(`${this.apiUrl}/jokes/${id}`, this.httpOptions);
    }

    createJoke(joke: Joke) {
        return this.httpClient.post(`${this.apiUrl}/jokes`, joke, this.httpOptions);
    }

    updateJoke(joke: Joke) {
        return this.httpClient.put(`${this.apiUrl}/jokes/${joke._id}`, joke, this.httpOptions);
    }

    deleteJoke(id: string) {
        return this.httpClient.delete(`${this.apiUrl}/jokes/${id}`, this.httpOptions);
    }

    createComment(comment: Comment) {
        return this.httpClient.post(`${this.apiUrl}/comments`, comment, this.httpOptions);
    }

    updateComment(comment: Comment) {
        return this.httpClient.put(`${this.apiUrl}/comments/${comment._id}`, comment, this.httpOptions);
    }
}
