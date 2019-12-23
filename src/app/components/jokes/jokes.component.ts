import { Component, OnInit } from '@angular/core';
import { JokesService, AlertService } from '../../services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/internal/operators';

import { Joke, Pagination } from '../../models';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
})

export class JokesComponent implements OnInit {
  config = {
    currentPage: 1,
    itemsPerPage: environment.limit,
    totalItems: 0,
  };
  submitted = false;
  jokes: Joke[] = [];
  search = new FormControl('');
  addJokeForm: FormGroup;

  constructor(
    private jokesService: JokesService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.addJokeForm = this.formBuilder.group({
      newJoke: ['', [Validators.required, Validators.maxLength(300)]],
    });
    this.jokesService.findAll(this.getFindAllParams())
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setConfigDataAndJokes(pagination);
      });
  }

  getFindAllParams() {
    return {
      page: this.config.currentPage,
      limit: this.config.itemsPerPage,
      search: this.search.value,
    };
  }

  get formFields() {
    return this.addJokeForm.controls;
  }

  setConfigDataAndJokes(pagination: Pagination): void {
    const { docs, page, totalDocs, limit } = pagination;
    this.config = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: totalDocs,
    };
    this.jokes = docs;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addJokeForm.invalid) {
      return;
    }

    this.jokesService.create({ joke: this.formFields.newJoke.value })
      .pipe(first())
      .subscribe(
        (joke: Joke) => {
          this.jokes.unshift(joke);
          this.jokes.pop();
          this.submitted = false;
          this.formFields.newJoke.setValue('');
          this.alertService.success(
            'Joke created!',
            false,
            2000
          );
        });
  }

  pageChange(newPage: number) {
      this.config.currentPage = newPage;
      this.jokesService.findAll(this.getFindAllParams())
          .pipe(first())
          .subscribe((pagination: Pagination) => {
              this.setConfigDataAndJokes(pagination);
          });
  }

  onFindClick() {
    this.config.currentPage = 1;
    this.jokesService.findAll(this.getFindAllParams())
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setConfigDataAndJokes(pagination);
      });
  }

  onClearClick() {
    this.config.currentPage = 1;
    this.search.setValue('');
    this.jokesService.findAll(this.getFindAllParams())
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setConfigDataAndJokes(pagination);
      });
  }
}
