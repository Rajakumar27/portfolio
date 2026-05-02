import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule,FormsModule,CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  standalone: true
})
export class Contact {
  loading = false;
  success = false;
ngOnInit(){
  emailjs.init('FD_nxNDANooB8_XtE'); //YOUR_PUBLIC_KEY
}
sendEmail(form: any) {
  if (form.invalid) return;
  this.loading = true;
  this.success = false;
  emailjs.send(
    'service_3h876wo',//YOUR_SERVICE_ID
    'template_ezbbsfl',//YOUR_TEMPLATE_ID
    {
      from_name: form.value.name,
      from_email: form.value.email,
      message: form.value.message
    }
  ).then(
    () => {
      console.log('SUCCESS!');
      alert('Message sent successfully');
      this.loading = false;
        this.success = true;
        form.reset();

        setTimeout(() => {
          this.success = false;
        }, 3000);
    },
    (error) => {
      console.error('FAILED...', error);
      this.loading = false;
        console.error('FAILED...', error);
        alert('Something went wrong ❌');
    }
  );
}
}
