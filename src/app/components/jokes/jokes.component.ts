import {Component, OnInit} from '@angular/core';
import {JokesService, AlertService} from '../../services';
import {FormControl} from '@angular/forms';
import {environment} from "../../../environments/environment";
import {first} from "rxjs/internal/operators";

import {Joke, Pagination} from '../../models';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {
  jokes: Joke[];
  page = 1;
  pages: any[];
  limit = environment.limit;
  search = new FormControl('');
  newJoke = new FormControl('');

  constructor(
    private jokesService: JokesService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.jokesService.findAll({
      page: this.page,
      limit: this.limit
    })
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setPaginationData(pagination);
      });
  }

  setPaginationData(pagination: Pagination):void {
    const { docs, totalPages, page } = pagination;
    this.jokes = docs;
    this.page = page;
    this.pages = new Array(totalPages);
  }

  update(joke: Joke) {
    this.jokesService.update(joke)
      .pipe(first())
      .subscribe((responseJoke: Joke) => {
        const updatedJoke: Joke = this.jokes.find(({ _id  }) => _id === responseJoke._id);
        updatedJoke.joke = responseJoke.joke;
      });
  }

  delete(joke: Joke) {
    this.jokesService.delete(joke._id)
      .pipe(first())
      .subscribe((responseJoke: Joke) => {
        const updatedJoke: Joke = this.jokes.find(({ _id  }) => _id === responseJoke._id);
        updatedJoke.joke = responseJoke.joke;
      });
  }

  onAddClick() {
    this.jokesService.create({ joke: this.newJoke.value })
      .pipe(first())
      .subscribe((joke: Joke) => {
        this.jokes.unshift(joke);
        this.jokes.pop();
        this.newJoke.setValue('');
        this.alertService.success('Joke created!', false)
      });
  }

  onPageClick(page: number) {
    this.page = page;
    this.jokesService.findAll({
      page: this.page,
      limit: this.limit,
    })
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setPaginationData(pagination);
      });
  }

  onFindClick() {
    this.page = 1;
    this.jokesService.findAll({
      page: this.page,
      limit: this.limit,
      search: this.search.value,
    })
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setPaginationData(pagination);
      });
  }

  onClearClick() {
    this.page = 1;
    this.search.setValue('');
    this.jokesService.findAll({
      page: this.page,
      limit: this.limit,
    })
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setPaginationData(pagination);
      });
  }
}
