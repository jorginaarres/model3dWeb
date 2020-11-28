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
  name = new FormControl('', [Validators.required]);
  error = false;


  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  onSubmit(formGroup: any): void {

    if ((this.name.value === formGroup.value.pass) && this.name.value !== '' && formGroup.value.pass !== '' ){
      this.router.navigate(['menu']);
    }
    else { this.error = true; }
  }
}
