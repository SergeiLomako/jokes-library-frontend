import { Component, Input } from '@angular/core';
import { Joke } from '../../models'

@Component({
  selector: 'app-joke-list-item',
  templateUrl: './joke-list-item.component.html',
})

export class JokeListItemComponent {
  @Input() joke: Joke;
}
