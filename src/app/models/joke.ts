
export class Joke {
  _id?: string;
  joke: string;
  comments?: {
    _id: string;
    comment: string;
  }[]
}
