import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {
  quickAddForm!: FormGroup;

  channels: string[] = ['Channel 1', 'Channel 2', 'Channel 3'];
  sources: string[] = ['Source 1', 'Source 2', 'Source 3'];
  campaigns: string[] = ['Campaign 1', 'Campaign 2', 'Campaign 3'];
  mediums: string[] = ['Medium 1', 'Medium 2', 'Medium 3'];
  levels: string[] = ['Level 1', 'Level 2', 'Level 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];
  courses: string[] = ['Course 1', 'Course 2', 'Course 3'];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<QuickAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.quickAddForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      channel: [''],
      source: ['', Validators.required],
      campaign: [''],
      medium: [''],
      level: ['', Validators.required],
      department: ['', Validators.required],
      course: ['', Validators.required],
      welcomeEmail:[''],
      welcomeSms:[]
    });
  }

  clearSource() {
    this.quickAddForm.get('source')?.setValue('');
  }
  
  clearCampaign() {
    this.quickAddForm.get('campaign')?.setValue('');
  }
  
  clearMedium() {
    this.quickAddForm.get('medium')?.setValue('');
  }
  
  clearLevel() {
    this.quickAddForm.get('level')?.setValue('');
  }
  
  clearDepartment() {
    this.quickAddForm.get('department')?.setValue('');
  }
  
  clearCourse() {
    this.quickAddForm.get('course')?.setValue('');
  }
  clearChannel(){
    this.quickAddForm.get('channel')?.setValue('');
  }
  onSubmit() {
    if (this.quickAddForm.valid) {
      // Form is valid, perform submission logic here
    } else {
      // Form is invalid, display error messages
      this.quickAddForm.markAllAsTouched();
    }
  }

}
