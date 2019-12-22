import { Component, OnInit } from '@angular/core';
import { JokesService, AlertService } from '../../services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { first } from "rxjs/internal/operators";

import {Joke, Pagination} from '../../models';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {
  submitted = false;
  jokes: Joke[] = [];
  page = 1;
  pages: any[];
  limit = environment.limit;
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
    this.jokesService.findAll({
      page: this.page,
      limit: this.limit
    })
      .pipe(first())
      .subscribe((pagination: Pagination) => {
        this.setPaginationData(pagination);
      });
  }

  get formFields() {
    return this.addJokeForm.controls;
  }

  setPaginationData(pagination: Pagination):void {
    const { docs, totalPages, page } = pagination;
    this.jokes = docs;
    this.page = page;
    this.pages = new Array(totalPages);
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
          )
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
