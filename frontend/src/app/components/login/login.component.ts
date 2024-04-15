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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorText:any
	showAlert: boolean = false;

  constructor(private authSer: AuthService, private routeSer: RouterService) {
		this.loginForm = new FormGroup({
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
		this.authSer.login(this.loginForm.value).subscribe((res: any) => {
				if(res.statusCode === 200){
					this.routeSer.home()
					localStorage.setItem('token', res.token)
					}else{
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

}
