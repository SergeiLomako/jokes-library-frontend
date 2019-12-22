import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JokesService, AlertService } from "../../services";
import { Joke } from '../../models';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-single-joke',
  templateUrl: './joke-detail.component.html',
})

export class JokeDetailComponent implements OnInit {
  joke: Joke;
  showConfirmButton = false;
  @ViewChild('jokeInput', { static: false }) jokeInputRef: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jokesService: JokesService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.jokesService.findOne(id)
      .pipe(first())
      .subscribe((joke: Joke) => {
        this.joke = joke;
      })
  }

  onSaveClick(joke: HTMLInputElement) {
    this.joke.joke = this.jokeInputRef.nativeElement.value;
    this.jokesService.update(this.joke)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Joke updated!', false, 2000)
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
