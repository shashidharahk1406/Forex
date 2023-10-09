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
	// show: boolean = false;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  constructor(private _fb:FormBuilder,
    private commonService:CommonServiceService,
	private router:Router,private api:ApiService){}
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.loginForm = this._fb.group({
		email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
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
		if(this.loginForm.invalid){
			console.log("Invalid");	
		}
		else{
		  this.api.login(this.loginForm.value).subscribe(
			(resp:any)=>{
				this.loginForm.reset()
				localStorage.setItem('token',resp.result[0].token)
				const decodedToken:any = jwtDecode(resp.result[0].token);
				console.log("==userid==",decodedToken);
				localStorage.setItem('user_id',decodedToken.user_id)
				
				this.router.navigate(['/advancesettings'])
			},
			(error:any)=>{
				console.log("Error", error);	
			}
		  )
		}
	  }
}
