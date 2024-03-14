import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginForm!:FormGroup;
  id:any;
  dropDownValues:any;
	// show: boolean = false;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  constructor(private _fb:FormBuilder,
    private commonService:CommonServiceService,
	private router:Router,private api:ApiService){

		this.id=localStorage.getItem('id')
	}
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.loginForm = this._fb.group({
		email:['',[Validators.required,Validators.email,this.api.emailWithTldValidator()]],
      password:['',[Validators.required]],
	  device_type:['',[Validators.required]]
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  
 //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
    //  images = [62, 83, 466, 965, 982, 1043, 738].map((n) =>'../../../assets/images/analyse.pdf');
  myImages = [
	'../../../assets/images/img-1.png',
	'../../../assets/images/img-2.png',
	'../../../assets/images/img-3.png',
  ]
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
	goToForgotPassword(){
		this.router.navigate(['/forgotPass'])
	}
	login(){
		this.loginForm.patchValue({device_type:"computer"})

		if(this.loginForm.invalid){
			//console.log("Invalid");	
		}
		else{
		  this.api.login(this.loginForm.value).subscribe(
			(resp:any)=>{
				//console.log(resp,"login responsssssssssssss",)
				localStorage.setItem('resp',JSON.stringify(resp))
				// this.api.showSuccess('Login Successfull !!')
				localStorage.setItem('token',resp.token.token)
				const decodedToken:any = jwtDecode(resp.token.token);
				console.log("==userid==",decodedToken);
				localStorage.setItem('user_id',decodedToken.user_id);
				localStorage.setItem('decodedToken',JSON.stringify(decodedToken))
				// localStorage.setItem('Dropdown Values',JSON.stringify(resp.permissions[1].children_status[0].access_status))
				// localStorage.setItem('User and Roles',resp.permissions[1].children_status[1].access_status)
				// localStorage.setItem('Communications',resp.permissions[1].children_status[2].access_status)
				
				localStorage.setItem('user_role',decodedToken.user_role)
				this.api.showSuccess('Login Successfull!')
				this.router.navigate(['/analytics'])
				this.loginForm.reset()

			},
			(error=>{
			   this.api.showError(this.api.toTitleCase(error.error.message))
			})
		  )
		}
	  }


	  
}
