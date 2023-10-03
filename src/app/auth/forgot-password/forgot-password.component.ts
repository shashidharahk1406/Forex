import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hidePassword = true;
  loginForm!:FormGroup;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  constructor(private _fb:FormBuilder,
    private commonService:CommonServiceService){}
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.loginForm = this._fb.group({
      email:['',[Validators.required,Validators.email]],
    })
  }
  get f() {
    return this.loginForm.controls;
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
  submit(){}
}
