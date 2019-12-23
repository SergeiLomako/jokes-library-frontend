import { Component, OnInit, Input } from '@angular/core';
import { Comment} from '../../models';
import { CommentsService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
})

export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  submitted = false;
  saving = false;
  updatedCommentForm: FormGroup;

  constructor(
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.updatedCommentForm = this.formBuilder.group({
      updatedComment: [this.comment.comment, [Validators.required, Validators.maxLength(300)]],
    });
  }

  get formFields() {
    return this.updatedCommentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.updatedCommentForm.invalid) {
      return;
    }

    this.saving = true;
    this.comment.comment = this.formFields.updatedComment.value;
    this.commentsService.update(this.comment)
      .pipe(first())
      .subscribe(() => {
        this.submitted = false;
        setTimeout(() => {
          this.saving = false;
        }, 1000)
      })
  }
}
