import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Contact Us</h1>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="block mb-2">Name</label>
          <input type="text" formControlName="name" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Email</label>
          <input type="email" formControlName="email" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Subject</label>
          <input type="text" formControlName="subject" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Message</label>
          <textarea formControlName="message" class="w-full p-2 border rounded" rows="4"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send Message</button>
      </form>
    </div>
  `
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.createContact(this.contactForm.value).subscribe({
        next: () => {
          alert('Message sent successfully!');
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          alert('Error sending message. Please try again.');
        }
      });
    }
  }
} 