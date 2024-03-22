import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/API/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hidePassword = true;
  forgotForm!:FormGroup;
  id:any
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  constructor(private _fb:FormBuilder,
    private commonService:CommonServiceService, private api:ApiService,private router:ActivatedRoute,private route:Router){
      this.id = this.router.snapshot.paramMap.get('id')
    }
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.forgotForm = this._fb.group({
      new_password:['',[Validators.required]],
      confirm_password:['',[Validators.required]],
    })
  }
  get f() {
    return this.forgotForm.controls;
  }
  
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
	error:boolean=false
  submit(){
		//console.log(this.forgotForm.get('new_password')?.value);
		
if(this.forgotForm.invalid){
	// this.error=true
	this.forgotForm.markAllAsTouched()
}
else{
	if(this.forgotForm.get('new_password')?.value === this.forgotForm.get('confirm_password')?.value){
		this.error=true
		this.api.sendNewPassword(this.id,this.forgotForm.value).subscribe(
			(resp:any)=>{
				this.route.navigate(['/login'])
				this.api.showSuccess(resp.message)
			},
			(error:any)=>{
				this.api.showError(error.error.message)
			}
		)
	}
	else{
		this.error=true
		//console.log('miss');
		
	}

}
  }

  getPassword(event:any){
	console.log(event.target.value,"password")

  }
}
