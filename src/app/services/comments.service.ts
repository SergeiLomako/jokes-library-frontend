import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Comment } from "../models";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(comment: Comment) {
    return this.http.post(`${this.apiUrl}/comments`, comment);
  }

  update(comment: Comment) {
    return this.http.put(`${this.apiUrl}/comments/${comment._id}`, comment);
  }
}
