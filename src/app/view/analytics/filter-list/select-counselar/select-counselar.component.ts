import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-counselar',
  templateUrl: './select-counselar.component.html',
  styleUrls: ['./select-counselar.component.css']
})
export class SelectCounselarComponent implements OnInit {
  selectedAllCounsellar: boolean = false;
  counselorSelected: any = [];
  allComplete: boolean = false;
  cousalerList = {
    name: 'All',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary',id:1},
      {name: 'Accent', completed: false, color: 'accent',id:2},
      {name: 'Warn', completed: false, color: 'warn',id:3},
    ],
  };
  constructor() { }

  ngOnInit(): void {
  }
  applyCounselor(){
    this.selectedAllCounsellar = this.allComplete
  }
  checkListCounselar(subtask: any) {
    if (subtask.completed) {
      // If the subtask is completed, remove it from the counselorSelected array
      this.counselorSelected = this.counselorSelected.filter((fs: any) => fs.id !== subtask.id);
    } else {
      // If the subtask is not completed, add it to the counselorSelected array
      this.counselorSelected.push(subtask);
    }
  
    //console.log(this.counselorSelected, 'selected counselor');
  }
  updateAllComplete() {
    this.allComplete = this.cousalerList.subtasks != null && this.cousalerList.subtasks.every((t:any) => t.completed);
  }

  someComplete(): boolean {
    if (this.cousalerList.subtasks == null) {
      return false;
    }
    return this.cousalerList.subtasks.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed:any) {
   
    this.allComplete = completed;
    if (this.cousalerList.subtasks == null) {
      this.selectedAllCounsellar = false
      return;
    }
    
    this.cousalerList.subtasks.forEach((t:any) => (t.completed = completed));
    
  }
}
