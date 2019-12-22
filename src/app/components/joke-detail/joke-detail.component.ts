import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JokesService, AlertService } from "../../services";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Joke } from '../../models';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-single-joke',
  templateUrl: './joke-detail.component.html',
})

export class JokeDetailComponent implements OnInit {
  joke: Joke;
  submitted = false;
  saving = false;
  showConfirmButton = false;
  updatedJokeForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jokesService: JokesService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.jokesService.findOne(id)
      .pipe(first())
      .subscribe((joke: Joke) => {
        this.joke = joke;
        this.updatedJokeForm = this.formBuilder.group({
          updatedJoke: [joke.joke, [Validators.required, Validators.maxLength(300)]],
        });
      })
  }

  get formFields() {
    return this.updatedJokeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.updatedJokeForm.invalid) {
      return;
    }

    this.saving = true;
    this.joke.joke = this.formFields.updatedJoke.value;
    this.jokesService.update(this.joke)
      .pipe(first())
      .subscribe(() => {
        this.submitted = false;
        setTimeout(() => {
          this.saving = false;
        }, 1000)
      })
  }

  onDeleteClick() {
    this.showConfirmButton = true;
  }

  onConfirmClick() {
    this.jokesService.delete(this.joke._id)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success(
          'Joke removed!',
          true,
          2000
        );
        this.router.navigate(['/jokes']);
      })
  }
}
