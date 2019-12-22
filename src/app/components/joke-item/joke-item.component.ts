import { Component, OnInit, Input } from '@angular/core';
import { Joke } from '../../models'


@Component({
  selector: 'app-joke-item',
  templateUrl: './joke-item.component.html',
})
export class JokeItemComponent implements OnInit {
  @Input() joke: Joke;

  constructor() {}

  ngOnInit() {
  }

}
