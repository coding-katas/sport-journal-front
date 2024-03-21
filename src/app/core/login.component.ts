import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, ],
  template: `
    <div class="flex justify-center items-center h-screen bg-blue-500">
        <div class="bg-blue-200 rounded shadow p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form class="space-y-4"
          [formGroup]="loginForm"
          (ngSubmit)="login()"
          >
            <div>
              <label for="username" class="text-gray-700">Username</label>
              <input type="text" id="username" class="block w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none" formControlName="username">
            </div>
            <div>
              <label for="password" class="text-gray-700">Password</label>
              <input type="password" id="password" class="block w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none" formControlName="password">
            </div>
            <div>
              <button
              type="submit"
              class="bg-blue-500 text-white rounded px-4 py-2 w-full"
              [disabled]="loginForm.invalid"
              [class.opacity-50]="loginForm.invalid"
              >Login</button>
            </div>
          </form>
        </div>
      </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private loginService = inject(AuthService);
  private router = inject(Router);

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    const loginValue = { ...this.loginForm.value };
    this.loginService.login(loginValue).subscribe({
      next: (_) => {
        this.router.navigate(['/home']);
      },
      error: (e) => alert('User not Found'),
    });
  }
}
