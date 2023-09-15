import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayComponent } from './component/overlay/overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)

  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s)*(\S)(\S|\s)*(\s)*$/)
    ]),
    tag: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\s)*(\S)(\S|\s)*(\s)*$/)
    ])
  })

  name: string | undefined
  tag: string | undefined

  constructor() { }

  onSubmit() {
    this.router.navigate([], {
      queryParams: {
        name: this.profileForm.value.name,
        tag: this.profileForm.value.tag
      }
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        this.name = params['name']
        this.tag = params['tag']
      }
    })
  }
}
