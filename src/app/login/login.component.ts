import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup: any;
  error = false;
  submit = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  setDelay(): void {
   console.log('delay') ;
  }

  onSubmit(formGroup: any): void {
    this.submit = true;
    setTimeout(() => {
      this.submit = false;
      console.log('Just did something...');
      if ((formGroup.value.name === formGroup.value.pass) && formGroup.value.name !== '' && formGroup.value.pass !== '' ){
        this.router.navigate(['menu']);
      }
      else {
        this.error = true;
      }
    }, 500);


  }
}
