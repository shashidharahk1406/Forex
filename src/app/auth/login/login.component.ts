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
				console.log(resp,"login responsssssssssssss",)
				// this.api.showSuccess('Login Successfull !!')
				localStorage.setItem('token',resp.token.token)
				const decodedToken:any = jwtDecode(resp.token.token);
				console.log("==userid==",decodedToken);
				localStorage.setItem('user_id',decodedToken.user_id);
				this.dropDownValues=resp.permissions[0].adv_sett[0].dropdown_values;
				console.log(this.dropDownValues)
				localStorage.setItem('dropDownValues',this.dropDownValues);
				localStorage.setItem('chat_dis_enab',resp.permissions[0].adv_sett[0].chat_dis_enab)
				localStorage.setItem('courses',resp.permissions[0].adv_sett[0].courses)
				localStorage.setItem('del_user',resp.permissions[0].adv_sett[0].del_user)
				localStorage.setItem('demographics',resp.permissions[0].adv_sett[0].demographics)
				localStorage.setItem('email_temp_sett',resp.permissions[0].adv_sett[0].email_temp_sett)
				localStorage.setItem('priorities',resp.permissions[0].adv_sett[0].priorities)
				localStorage.setItem('repl_user',resp.permissions[0].adv_sett[0].repl_user)
				localStorage.setItem('res_pause_user',resp.permissions[0].adv_sett[0].res_pause_user)
				localStorage.setItem('reset_pass',resp.permissions[0].adv_sett[0].reset_pass)
				localStorage.setItem('sms_temp_sett',resp.permissions[0].adv_sett[0].sms_temp_sett)
				localStorage.setItem('sources_and_channels',resp.permissions[0].adv_sett[0].sources_and_channels)
				localStorage.setItem('status',resp.permissions[0].adv_sett[0].status)
				localStorage.setItem('user_add',resp.permissions[0].adv_sett[0].user_add)
				localStorage.setItem('user_and_roles',resp.permissions[0].adv_sett[0].user_and_roles)
				localStorage.setItem('user_perm',resp.permissions[0].adv_sett[0].user_perm)
				localStorage.setItem('user_status',resp.permissions[0].adv_sett[0].user_status)
				localStorage.setItem('whatsp_temp_sett',resp.permissions[0].adv_sett[0].whatsp_temp_sett)
				localStorage.setItem('chat_dis_enab',resp.permissions[0].adv_sett[0].chat_dis_enab)

				











				localStorage.setItem('user_and_roles',resp.permissions[0].adv_sett[0].user_and_roles)
                localStorage.setItem('adv_comm_sett',resp.permissions[0].adv_sett[0].adv_comm_sett)
				localStorage.setItem('edit_lead',resp.permissions[0].lead_list_sett[0].edit_lead)
				localStorage.setItem('add_note',resp.permissions[0].lead_list_sett[0].add_note)
				localStorage.setItem('delete_lead',resp.permissions[0].lead_list_sett[0].delete_lead)
				localStorage.setItem('download_leads',resp?.permissions[0]?.lead_list_sett[0].download_leads)
				localStorage.setItem('edit_lead',resp.permissions[0].lead_list_sett[0].edit_lead)
				localStorage.setItem('email',resp.permissions[0].lead_list_sett[0].email)
				localStorage.setItem('payment_details',resp.permissions[0].lead_list_sett[0].payment_details)
				localStorage.setItem('sms',resp.permissions[0].lead_list_sett[0].sms)
				localStorage.setItem('view_history',resp.permissions[0].lead_list_sett[0].view_history)
				localStorage.setItem('whatsapp',resp.permissions[0].lead_list_sett[0].whatsapp)
				
				// localStorage.setItem('token',resp.token.token)
				// const decodedToken:any = jwtDecode(resp.token.token);
				// console.log("==userid==",decodedToken);
				// localStorage.setItem('user_id',decodedToken.user_id)
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
