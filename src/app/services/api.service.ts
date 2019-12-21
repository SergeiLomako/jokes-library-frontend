import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Joke, Comment, User } from '../models';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    register(user: User) {
        return this.httpClient.post(`${this.apiUrl}/register`, user);
    }

    login(email: string, password: string) {
        return this.httpClient.post(`${this.apiUrl}/login`, { email, password });
    }

    getJokes({
        page = 1,
        limit = environment.limit,
        search = ''
    }) {
        return this.httpClient.get(`${this.apiUrl}/jokes?page=${page}&limit=${limit}&search=${search}`);
    }

    getJokeById(id: string) {
        return this.httpClient.get(`${this.apiUrl}/jokes/${id}`);
    }

    createJoke(joke: Joke) {
        return this.httpClient.post(`${this.apiUrl}/jokes`, joke);
    }

    updateJoke(joke: Joke) {
        return this.httpClient.put(`${this.apiUrl}/jokes/${joke._id}`, joke);
    }

    deleteJoke(id: string) {
        return this.httpClient.delete(`${this.apiUrl}/jokes/${id}`);
    }

    createComment(comment: Comment) {
        return this.httpClient.post(`${this.apiUrl}/comments`, comment);
    }

    updateComment(comment: Comment) {
        return this.httpClient.put(`${this.apiUrl}/comments/${comment._id}`, comment);
    }
}
