import { Component, Input, OnInit } from '@angular/core';
import { AlertService, CommentsService, AuthService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})

export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  addCommentForm: FormGroup;
  submitted = false;

  constructor(
    private alertService: AlertService,
    private commentsService: CommentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.addCommentForm = this.formBuilder.group({
      newComment: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  get formFields() {
    return this.addCommentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addCommentForm.invalid) {
      return;
    }

    const newCommentData = {
      joke: this.route.snapshot.paramMap.get('id'),
      user: this.authService.authUserData._id,
      comment: this.formFields.newComment.value,
    };

    this.commentsService.create(newCommentData)
      .pipe(first())
      .subscribe((newComment: Comment) => {
        this.comments.unshift(newComment);
        this.formFields.newComment.setValue('');
        this.submitted = false;
        this.alertService.success(
          'Comment created!',
          false,
          2000
        )
      })
  }
}
