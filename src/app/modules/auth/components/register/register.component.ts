import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Register</h1>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="block mb-2">Name</label>
          <input type="text" formControlName="name" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Email</label>
          <input type="email" formControlName="email" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Password</label>
          <input type="password" formControlName="password" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  `
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Handle registration
      console.log(this.registerForm.value);
    }
  }
} 