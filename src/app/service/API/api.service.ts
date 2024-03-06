import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  baseurl = environment.live_url;
  private leadData: any[] = [];
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}
  //Gateway Api
  //Login
  login(data: any) {
    return this.http.post(`${this.baseurl}/api/user-login/`, data);
  }
  //Login
  //ResetLink
  sendResetLink(data: any) {
    return this.http.post(`${this.baseurl}/api/reset-password/`, data);
  }
  //ResetLink
  //NewPassword
  sendNewPassword(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/reset-password/${id}/`, data);
  }
  //NewPassword

  //Advanced Settings api
  //Setup dropupdown value
  //Status
  getStatus(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/lead-list-status/?page_size=${size}&page=${pageNo}`
    );
  }
  getStatusSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/lead-list-status/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllStatus() {
    return this.http.get(`${this.baseurl}/api/lead-list-status/`);
  }
  getStatusById(id: any) {
    return this.http.get(`${this.baseurl}/api/lead-list-status/${id}/`);
  }
  editStatus(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/lead-list-status/${id}/`, data);
  }
  postStatus(data: any) {
    return this.http.post(`${this.baseurl}/api/lead-list-status/`, data);
  }
  delete(url: any) {
    return this.http.delete(url);
  }
  //Status
  //Sub Status
  //Sub Status

  getSubStatus(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/sub-status/?page_size=${size}&page=${pageNo}`
    );
  }
  getSubStatusSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/sub-status/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllSubStatus() {
    return this.http.get(`${this.baseurl}/api/sub-status/`);
  }
  getSubStatusById(id: any) {
    return this.http.get(`${this.baseurl}/api/sub-status/${id}/`);
  }
  editSubStatus(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/sub-status/${id}/`, data);
  }
  postSubStatus(data: any) {
    return this.http.post(`${this.baseurl}/api/sub-status/`, data);
  }
  //Master Status
  getAllMasterStatus() {
    return this.http.get(`${this.baseurl}/api/master-status/`);
  }
  //Master Status
  // Status Group
  getAllStatusGroup() {
    return this.http.get(`${this.baseurl}/api/status-group/`);
  }
  // Status Group
  // Status Group
  getAllReasonGroup() {
    return this.http.get(`${this.baseurl}/api/reason-group/`);
  }
  // Status Group
  //Channel
  getChannel(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/channel/?page_size=${size}&page=${pageNo}`
    );
  }
  getChannelSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/channel/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllChannel() {
    return this.http.get(`${this.baseurl}/api/channel/`);
  }
  getChannelById(id: any) {
    return this.http.get(`${this.baseurl}/api/channel/${id}/`);
  }
  editChannel(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/channel/${id}/`, data);
  }
  postChannel(data: any) {
    return this.http.post(`${this.baseurl}/api/channel/`, data);
  }
  //Channel
  //Source
  getSource(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/source/?page_size=${size}&page=${pageNo}`
    );
  }
  getSourceSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/source/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllSource() {
    return this.http.get(`${this.baseurl}/api/source/`);
  }
  getSourceById(id: any) {
    return this.http.get(`${this.baseurl}/api/source/${id}/`);
  }
  editSource(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/source/${id}/`, data);
  }
  postSource(data: any) {
    return this.http.post(`${this.baseurl}/api/source/`, data);
  }
  //Source
  //New Channel
  getNewChannel(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/new-channel/?page_size=${size}&page=${pageNo}`
    );
  }
  getNewChannelSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/new-channel/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllNewChannel() {
    return this.http.get(`${this.baseurl}/api/new-channel/`);
  }
  getNewChannelById(id: any) {
    return this.http.get(`${this.baseurl}/api/new-channel/${id}/`);
  }
  editNewChannel(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/new-channel/${id}/`, data);
  }
  postNewChannel(data: any) {
    return this.http.post(`${this.baseurl}/api/new-channel/`, data);
  }
  //Source
  //Campign
  getCampign(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/campaign/?page_size=${size}&page=${pageNo}`
    );
  }
  getCampignSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/campaign/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllCampign() {
    return this.http.get(`${this.baseurl}/api/campaign/`);
  }
  getCampignById(id: any) {
    return this.http.get(`${this.baseurl}/api/campaign/${id}/`);
  }
  editCampign(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/campaign/${id}/`, data);
  }
  postCampign(data: any) {
    return this.http.post(`${this.baseurl}/api/campaign/`, data);
  }
  //Campaign
  //Medium
  getMedium(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/medium/?page_size=${size}&page=${pageNo}`
    );
  }
  getMediumSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/medium/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllMedium() {
    return this.http.get(`${this.baseurl}/api/medium/`);
  }
  getMediumById(id: any) {
    return this.http.get(`${this.baseurl}/api/medium/${id}/`);
  }
  editMedium(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/medium/${id}/`, data);
  }
  postMedium(data: any) {
    return this.http.post(`${this.baseurl}/api/medium/`, data);
  }
  //Medium
  //Level of program
  getLevelOfProgram(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/level-of-program/?page_size=${size}&page=${pageNo}`
    );
  }
  getLevelOfProgramSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/level-of-program/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllLevelOfProgram() {
    return this.http.get(`${this.baseurl}/api/level-of-program/`);
  }
  getLevelOfProgramById(id: any) {
    return this.http.get(`${this.baseurl}/api/level-of-program/${id}/`);
  }
  editLevelOfProgram(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/level-of-program/${id}/`, data);
  }
  postLevelOfProgram(data: any) {
    return this.http.post(`${this.baseurl}/api/level-of-program/`, data);
  }
  //Level of program
  //Department
  getDepartment(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/department/?page_size=${size}&page=${pageNo}`
    );
  }
  getDepartmentSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/department/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllDepartment() {
    return this.http.get(`${this.baseurl}/api/department/`);
  }
  getDepartmentById(id: any) {
    return this.http.get(`${this.baseurl}/api/department/${id}/`);
  }
  editDepartment(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/department/${id}/`, data);
  }
  postDepartment(data: any) {
    return this.http.post(`${this.baseurl}/api/department/`, data);
  }
  //Department
  //Course
  getCourse(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/course/?page_size=${size}&page=${pageNo}`
    );
  }
  getCourseSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/course/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllCourse() {
    return this.http.get(`${this.baseurl}/api/course/`);
  }
  getCourseById(id: any) {
    return this.http.get(`${this.baseurl}/api/course/${id}/`);
  }
  editCourse(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/course/${id}/`, data);
  }
  postCourse(data: any) {
    return this.http.post(`${this.baseurl}/api/course/`, data);
  }
  //Course
  //Country
  getCountry(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/country/?page_size=${size}&page=${pageNo}`
    );
  }
  getCountrySearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/country/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllCountry() {
    return this.http.get(`${this.baseurl}/api/country/`);
  }
  getCountryById(id: any) {
    return this.http.get(`${this.baseurl}/api/country/${id}/`);
  }
  editCountry(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/country/${id}/`, data);
  }
  postCountry(data: any) {
    return this.http.post(`${this.baseurl}/api/country/`, data);
  }
  //Country
  //State
  getState(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/state/?page_size=${size}&page=${pageNo}`
    );
  }
  getStateSearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/state/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllState() {
    return this.http.get(`${this.baseurl}/api/state/`);
  }
  getStateById(id: any) {
    return this.http.get(`${this.baseurl}/api/state/${id}/`);
  }
  editState(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/state/${id}/`, data);
  }
  postState(data: any) {
    return this.http.post(`${this.baseurl}/api/state/`, data);
  }
  //State
  //City
  getCity(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/city/?page_size=${size}&page=${pageNo}`
    );
  }
  getCitySearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/city/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllCity() {
    return this.http.get(`${this.baseurl}/api/city/`);
  }
  getCityById(id: any) {
    return this.http.get(`${this.baseurl}/api/city/${id}/`);
  }
  editCity(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/city/${id}/`, data);
  }
  postCity(data: any) {
    return this.http.post(`${this.baseurl}/api/city/`, data);
  }
  //State
  //Priority
  getPriority(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/priority/?page_size=${size}&page=${pageNo}`
    );
  }
  getPrioritySearch(search: any, size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/priority/?page_size=${size}&page=${pageNo}&key=${search}`
    );
  }
  getAllPriority() {
    return this.http.get(`${this.baseurl}/api/priority/`);
  }
  getPriorityById(id: any) {
    return this.http.get(`${this.baseurl}/api/priority/${id}/`);
  }
  editPriority(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/priority/${id}/`, data);
  }
  postPriority(data: any) {
    return this.http.post(`${this.baseurl}/api/priority/`, data);
  }
  //Priority
  //Priority Group
  getPriorityGroup(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/priority-group/?page_size=${size}&page=${pageNo}`
    );
  }
  getAllPriorityGroup() {
    return this.http.get(`${this.baseurl}/api/priority-group/`);
  }
  getPriorityGroupById(id: any) {
    return this.http.get(`${this.baseurl}/api/priority-group/${id}/`);
  }
  editPriorityGroup(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/priority-group/${id}/`, data);
  }
  postPriorityGroup(data: any) {
    return this.http.post(`${this.baseurl}/api/priority-group/`, data);
  }
  //Priority Group
  //User
  getUser(size: any, pageNo: any, data: any) {
    if (data != null) {
      return this.http.get(
        `${this.baseurl}/api/user/?page_size=${size}&page=${pageNo}&${data}`
      );
    } else {
      console.log("coming else in service ");
      
      return this.http.get(
        `${this.baseurl}/api/user/?page_size=${size}&page=${pageNo}`
      );
    }
  }
  getUserSearch(search: any, size: any, pageNo: any, data: any) {
    if (data != null) {
      return this.http.get(
        `${this.baseurl}/api/user/?page_size=${size}&page=${pageNo}&key=${search}&${data}`
      );
    } else {
      return this.http.get(
        `${this.baseurl}/api/user/?page_size=${size}&page=${pageNo}&key=${search}`
      );
    }
  }
  getAllUser() {
    return this.http.get(`${this.baseurl}/api/user/`);
  }
  getuserByFilter(url: any) {
    return this.http.get(url);
  }
  getUserById(id: any) {
    return this.http.get(`${this.baseurl}/api/user/${id}/`);
  }
  editUser(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/user/${id}/`, data);
  }
  replaceUser(data: any) {
    return this.http.post(`${this.baseurl}/api/replace-user/`, data);
  }
  replaceOldUser(data: any) {
    return this.http.put(`${this.baseurl}/api/replace-user/`, data);
  }
  postUser(data: any) {
    return this.http.post(`${this.baseurl}/api/user/`, data);
  }
  pauseUser(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/manage-user/${id}/`, data);
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.baseurl}/api/user/${id}/`);
  }
  //User
  //Role
  getRole(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/role/?page_size=${size}&page=${pageNo}`
    );
  }
  getAllRole() {
    return this.http.get(`${this.baseurl}/api/role/`);
  }
  getRoleById(id: any) {
    return this.http.get(`${this.baseurl}/api/role/${id}/`);
  }
  editRole(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/role/${id}/`, data);
  }
  postRole(data: any) {
    return this.http.post(`${this.baseurl}/api/role/`, data);
  }
  //Role
  //Designation
  getDesignation(size: any, pageNo: any) {
    return this.http.get(
      `${this.baseurl}/api/designation/?page_size=${size}&page=${pageNo}`
    );
  }
  getAllDesignation() {
    return this.http.get(`${this.baseurl}/api/designation/`);
  }
  getDesignationById(id: any) {
    return this.http.get(`${this.baseurl}/api/designation/${id}/`);
  }
  editDesignation(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/designation/${id}/`, data);
  }
  postDesignation(data: any) {
    return this.http.post(`${this.baseurl}/api/designation/`, data);
  }
  //Role

  //Whatsapp Template
  getWhatsappTemplate(size: any, pageNo: any, data: any) {
    if (data != null) {
      return this.http.get(
        `${this.baseurl}/api/template/?page_size=${size}&page=${pageNo}&${data}`
      );
    } else {
      return this.http.get(
        `${this.baseurl}/api/template/?page_size=${size}&page=${pageNo}`
      );
    }
    // return this.http.get(`${this.baseurl}/api/template?page_size=${size}&page=${pageNo}`)
  }
  getWhatsappTemplateSearch(search: any, size: any, pageNo: any, data: any) {
    if (data != null) {
      return this.http.get(
        `${this.baseurl}/api/template/?page_size=${size}&page=${pageNo}&key=${search}&${data}`
      );
    } else {
      return this.http.get(
        `${this.baseurl}/api/template/?page_size=${size}&page=${pageNo}&key=${search}`
      );
    }
  }
  getAllWhatsappTemplate() {
    return this.http.get(`${this.baseurl}/api/template/`);
  }
  getWhatsappTemplateById(id: any) {
    return this.http.get(`${this.baseurl}/api/template/${id}/`);
  }
  editWhatsappTemplate(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/template/${id}/`, data);
  }
  postWhatsappTemplate(data: any) {
    return this.http.post(`${this.baseurl}/api/template/`, data);
  }
  getPlaceHolder() {
    return this.http.get(`${this.baseurl}/api/placeholder/`);
  }
  createDuplicate(id: any) {
    return this.http.post(
      `${this.baseurl}/api/template/${id}/duplicate_template/`,
      null
    );
  }
  //Whatsapp Template
  //Report
  getTarget() {
    return this.http.get(`${this.baseurl}/api/employee-target/`);
  }
  getAcheived() {
    return this.http.get(`${this.baseurl}/api/employee-target-achived/`);
  }
  postEmployeeForReport(data: any) {
    return this.http.post(`${this.baseurl}/api/employee-target-achived/`, data);
  }
  //Report

  // Success Message
  showSuccess(message: any) {
    this.toastr.success(message);
  }
  // Error Message
  showError(message: any) {
    this.toastr.error(message);
  }
  // Warning Message
  showWarning(message: any) {
    this.toastr.warning(message);
  }

  //Raw data upload
  postRawdata(data: any) {
    return this.http.post(`${this.baseurl}/api/upload-lead-data/`, data);
  }
  getLeadData(): any[] {
    return this.leadData;
  }

  setLeadData(data: any[]): void {
    this.leadData = data;
  }

  //get lead count
  getLeadCount() {
    return this.http.get(`${this.baseurl}/api/lead_status_count/`);
  }
  //get lead count

  //get advance-settigs permissions
  getAdvanceSettingsPermissions(id: any) {
    return this.http.get(`${this.baseurl}/api/permissions_by_user/${id}/`);
  }
  updateAdvanceSettingsPermissions(id: any, data: any) {
    return this.http.put(
      `${this.baseurl}/api/permissions_by_user/${id}/`,
      data
    );
  }

  //Get Leadlist Permissions
  getLeadListPermissions(id: any) {
    return this.http.get(`${this.baseurl}/api/permissions_by_user/${id}/`);
  }
  updateLeadListPermissions(id: any, data: any) {
    return this.http.put(
      `${this.baseurl}/api/permissions_by_user/${id}/`,
      data
    );
  }
  //Title Case
  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  //Title Case

  // Email Validation
  emailWithTldValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value as string;

      if (!email) {
        // If the email is empty, don't perform the check
        return null;
      }

      // Use the built-in email validator
      const emailValidator = Validators.email(control);

      if (emailValidator) {
        // If the email format is invalid, return the error
        return emailValidator;
      }

      // Check if the email has a valid TLD
      const tldRegex = /\.[a-zA-Z]{2,}$/;
      if (!tldRegex.test(email)) {
        // If the TLD is invalid, return the error
        return { invalidTld: true };
      }

      // If everything is valid, return null (no error)
      return null;
    };
  }
  // Email Validation

  // My-Followups

  getAllFollowUp(id: any, pageNo: any, size: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?counsellor_id=${id}&page=${pageNo}&page_size=${size}`
    );
  }

  getUpcomingFollowUps(id: any, pageNo: any, size: any, status: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?counsellor_id=${id}&follow_up_status=${status}&page=${pageNo}&page_size=${size}`
    );
  }
  getDoneFollowUps(id: any, status: any, pageNo: any, size: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?counsellor_id=${id}&follow_up_status=${status}&page=${pageNo}&page_size=${size}`
    );
  }

  getMissedFollowUps(id: any, pageNo: any, size: any, status: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?counsellor_id=${id}&follow_up_status=${status}&page=${pageNo}&page_size=${size}`
    );
  }

  filterFollowUps(id: any, pageNo: any, size: any, status: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?counsellor_id=${id}&follow_up_status=${status}&page=${pageNo}&page_size=${size}`
    );
  }
  getFollowUpByLeadId(id: any) {
    return this.http.get(`${this.baseurl}/api/follow-up/${id}/`);
  }
  updateLeadFollowUp(id: any, data: any) {
    return this.http.put(`${this.baseurl}/api/follow-up/${id}/`, data);
  }

  allFollowUpStatuses() {
    return this.http.get(`${this.baseurl}/api/follow-up-status/`);
  }
  //For Counsellor
  followUpCountsOnCalenderForCounsellor(id: any, date: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&counsellor_id=${id}`
    );
  }

  //For Admin
  getFollowUpsbyDateForAdmin(date: any, pageNo: any, size: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}`
    );
  }
  //For Admin
  getAllFollowupsForAdmin(pageNo: any, size: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?page=${pageNo}&page_size=${size}`
    );
  }

  getUpcomingFollowupsForAdmin(pageNo: any, size: any, status: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?page=${pageNo}&page_size=${size}&follow_up_status=${status}`
    );
  }

  getMissedFollowupsForAdmin(pageNo: any, size: any, status: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?page=${pageNo}&page_size=${size}&follow_up_status=${status}`
    );
  }

  getDoneFollowupsForAdmin(pageNo: any, size: any, status: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?page=${pageNo}&page_size=${size}&follow_up_status=${status}`
    );
  }

  getFollowupCalenderCountsForAdmin(date: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}`
    );
  }

  getCalenderUpcomingFollowupsForAdmin(
    date: any,
    pageNo: any,
    size: any,
    status: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&follow_up_status=${status}`
    );
  }

  getCalenderDoneFollowupsForAdmin(
    date: any,
    pageNo: any,
    size: any,
    status: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&follow_up_status=${status}`
    );
  }
  getCalenderMissedFollowupsForAdmin(
    date: any,
    pageNo: any,
    size: any,
    status: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&follow_up_status=${status}`
    );
  }

  //For Counselllor
  getAllFollowupsForCounsellor(pageNo: any, size: any, id: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?page=${pageNo}&page_size=${size}&counsellor_id=${id}`
    );
  }

  getAllFollowupsByDateForCounsellor(
    date: any,
    pageNo: any,
    size: any,
    id: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&counsellor_id=${id}`
    );
  }

  getCalenderUpcomingFollowupsForCounsellor(
    date: any,
    pageNo: any,
    size: any,
    id: any,
    status: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&counsellor_id=${id}&follow_up_status=${status}`
    );
  }
  getCalenderDoneFollowupsForCounsellor(
    date: any,
    pageNo: any,
    size: any,
    id: any,
    status: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&counsellor_id=${id}&follow_up_status=${status}`
    );
  }
  getCalenderMissedFollowupsForCounsellor(
    date: any,
    pageNo: any,
    size: any,
    id: any,
    status: any
  ) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?action_datetime=${date}&page=${pageNo}&page_size=${size}&counsellor_id=${id}&follow_up_status=${status}`
    );
  }

  searchFollowupsForAdmin(key: any, pageNo: any, size: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?key=${key}&page=${pageNo}&page_size=${size}`
    );
  }

  searchFollowupsForCounsellor(key: any, pageNo: any, size: any, id: any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?key=${key}&page=${pageNo}&page_size=${size}&counsellor_id=${id}`
    );
  }

  sortForAdmin(sortType: any, pageNo: any, size: any,status:any,date:any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?filter_by=${sortType}&page=${pageNo}&page_size=${size}&follow_up_status=${status}&action_datetime=${date}`
    );
  }

  sortForCounsellor(sortType: any, pageNo: any, size: any, id: any,status:any,date:any) {
    return this.http.get(
      `${this.baseurl}/api/follow-up/?filter_by=${sortType}&page=${pageNo}&page_size=${size}&counsellor_id=${id}&follow_up_status=${status}&action_datetime=${date}`
    );
  }

// filterFollowupsForAdmin(source:any,stream:any,city:any,pageNo:any,size:any){
//   return this.http.get(`${this.baseurl}/api/follow-up/?page=${pageNo}&source_id=${source}&city_id=${city}&stream_id=${stream}&page_size=${size}`)

// }



filterFollowupsForAdmin(pageNo:any,size:any){
  
  return this.http.get(`${this.baseurl}/api/follow-up/?page=${pageNo}&page_size=${size}`)

}

getStreams(){
  return this.http.get(`${this.baseurl}/api/studying-stream/`)
}

}
