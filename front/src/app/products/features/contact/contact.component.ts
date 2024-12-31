import { Component, OnInit, inject, signal } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule]
  })
export class ContactComponent {


  private fb =  inject(FormBuilder);
  
  private messageService =  inject(MessageService);

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(300)]]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Demande de contact envoyée avec succès' });
    }
  }  
}
