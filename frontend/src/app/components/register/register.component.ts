import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { RouterService } from '../../services/router.service';
import {
  Input,
  Ripple,
	Alert,
  initTE
} from "tw-elements";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	errorText:any
	showAlert: boolean = false;

  constructor(private authSer: AuthService, private routeSer: RouterService) {
		this.registerForm = new FormGroup({
			firstName: new FormControl("", [Validators.required]),
			lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required])
		});
	}

  ngOnInit(): void {
		initTE({ Input, Ripple, Alert });
	}

	hideAlert(){
		setTimeout(() => {
			this.showAlert = false
		}, 3000)
	}

	OnSubmit() {
    // if (!this.registerForm.valid) {
    //   return;
    // } else {

    // }

    this.authSer.register(this.registerForm.value).subscribe(
      (res: any) => {
        if(res.statusCode == 200){
          this.routeSer.home()
          localStorage.setItem('token', res.token)
          }else {
            this.errorText = res.msg
            this.showAlert = true;
            this.hideAlert()
        }
      },
      (err) => {
        alert("We got an error in Login...");
        }
      );

	}

  get f() {
    return this.registerForm.controls;
  }
}
