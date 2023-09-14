import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption!: string;
  categoryFilterArr = ['Lead Category 1','Lead Category 2','Lead Category 3','Lead Category 4'];
  selectedArr:any = [];
  filteredArray:any = [];
  snippetList:any = [];
  filterdSnippetList:any = [];
  showHint: boolean = true;
  showHintFilter:boolean = true;
  selectedCategory:any;
  appliedFilter: any = [];
  selectedAllCounsellar: boolean = false;
  counselorSelected: any = [];
  fiterType:any
  constructor() { }

  ngOnInit(): void {
   
  }
  category = [
    
      {name: 'Lead Category', completed: false, color: 'primary',id:1},
      {name: 'Main Category', completed: false, color: 'accent',id:2},
      {name: 'Category', completed: false, color: 'warn',id:3},
    
  ]
  tasks:any =[ 
    {
    name: 'Lead Category',
    completed: false,
    color: 'primary',
     id:1,
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Category', completed: false, color: 'warn'},
    ],
  },
  {
    name: 'Main Category',
    completed: false,
    color: 'primary',
    id:2,
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary',id:4},
      {name: 'Accent', completed: false, color: 'accent',id:5},
      {name: 'Warn', completed: false, color: 'warn',id:6},
    ],
  },
  {
    name: 'Category',
    completed: false,
    color: 'primary',
    id:3,
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary',id:4},
      {name: 'Accent', completed: false, color: 'accent',id:5},
      {name: 'Warn', completed: false, color: 'warn',id:6},
    ],
  },
];
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

  allComplete: boolean = false;

  
 
  // someComplete(task:any) {
  //   return task.subtasks.some((subtask:any) => !subtask.completed);
  // }
 
  // updateAllComplete(task: any) {
  //   // this.allComplete = this.tasks.every((task: any) => {
  //   //       return task.subtasks && task.subtasks.every((subtask: any) => subtask.completed);
  //   //     });
    
  // }
  
  // setAll(completed: boolean) {
  //   // this.allComplete = completed;
  
  //   // // Iterate through each task and its subtasks
  //   // this.tasks.forEach((task: any) => {
  //   //   if (task.subtasks) {
  //   //     task.subtasks.forEach((subtask: any) => {
  //   //       subtask.completed = completed;
  //   //     });
  //   //   }
  //   // });
  // }
  
  
  openCategoryPanel(items:any){
    this.selectedCategory = items
    if(items){
      this.selectedArr = this.tasks.filter((task: any) =>task.id === items.id);
    }

      // Check the length of the filtered array
      if (this.selectedArr.length === 0) {
        this.showHint = true;
      } else {
        this.showHint = false;
      }
  }
   
  
  
  selectedSnippets(items: any, completed: boolean) {
    if (completed === false) {
      // Check if an item with the same name already exists in the snippetList
      const existingItem = this.snippetList.find((sl: any) => sl.name === items.name);
  
      // If it doesn't exist, push it to the snippetList with count 1
      if (!existingItem) {
        this.snippetList.push({ ...items, count: 1 });
      } else {
        // If it exists, increment the count
        existingItem.count = (existingItem.count || 1) + 1;
      }
      this.filterdSnippetList = this.snippetList;
    } else {
      // Find the item in snippetList based on id
      const existingItemIndex = this.snippetList.findIndex((sl: any) => sl.id === items.id);
  
      if (existingItemIndex !== -1) {
        // Decrement the count
        this.snippetList[existingItemIndex].count = (this.snippetList[existingItemIndex].count || 1) - 1;
  
        // Remove the item if count becomes 0
        if (this.snippetList[existingItemIndex].count === 0) {
          this.snippetList.splice(existingItemIndex, 1);
        }
      }
  
      this.filterdSnippetList = this.snippetList;
    }
  
   // console.log(this.snippetList, "snippetList ITEMS------------------");
  
    if (this.filterdSnippetList.length === 0) {
      this.showHintFilter = true;
    } else {
      this.showHintFilter = false;
    }
  }
  

  selecteAllSnippets(tasks:any){
    console.log(tasks,'TASKS___________')
    if(this.tasks.completed === true){
      this.filterdSnippetList.push(...this.filterdSnippetList,tasks)
    }
   
    // alert(this.filterdSnippetList)
    console.log(this.filterdSnippetList)
  }
 
  selectAllSnippets(tasks: any) {
    // Initialize a count and an empty array for snippetList
    let count = 0;
    // Clear the filterdSnippetList array before processing
    this.filterdSnippetList = [];
    
    // Check if tasks has a subtasks property and it's an array
    if (tasks && Array.isArray(tasks.subtasks)) {
        tasks.subtasks.forEach((subtask: any) => {
            if (subtask.completed === false) {
                // If subtask is not completed, increment count and push its name to filterdSnippetList
                count++;
            }
        });
    }
    
    // Push the entire tasks object into filterdSnippetList if at least one subtask is not completed
    if (count > 0) {
        this.filterdSnippetList.push(tasks);
    }

    console.log("Count of non-completed subtasks:", count);
    console.log("Non-completed subtasks:", this.filterdSnippetList);
}

  removeList(items: any) {
    // Remove the item from filterdSnippetList based on id
    this.filterdSnippetList = this.filterdSnippetList.filter((fs: any) => fs.id !== items.id);
    this.snippetList = this.filterdSnippetList
    // Reset the allComplete flag
    this.allComplete = false;
  
    // Check if filterdSnippetList is empty
    if (this.filterdSnippetList.length === 0) {
      this.showHintFilter = true;
    } else {
      this.showHintFilter = false;
    }
  
    // Reset the completed flag for subtasks in the tasks array
    this.tasks.forEach((t: any) => {
      if (items.id === t.id) {
        t.subtasks.forEach((subtask: any) => {
          subtask.completed = false;
        });
      }
    });
  }
  removeAllList(){
    this.filterdSnippetList = []
    this.snippetList = []
    this.selectedArr= [];
    this.selectedCategory = []; 
    this.appliedFilter = []
    this.tasks.forEach((task:any)=>{
      task.subtasks.forEach((sub:any)=>{
        sub.completed = false
      })
    })
  }
  apply(){
    this.selectedCategory = []; 
    this.appliedFilter =  this.filterdSnippetList;
  }
  closePopup(){
    this.removeAllList();
  }
  applyCounselor(){
    this.selectedAllCounsellar = this.allComplete
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

  setAll(completed: boolean) {
   
    this.allComplete = completed;
    if (this.cousalerList.subtasks == null) {
      this.selectedAllCounsellar = false
      return;
    }
    
    this.cousalerList.subtasks.forEach((t:any) => (t.completed = completed));
    
  }
  checkListCounselar(subtask: any) {
    if (subtask.completed) {
      // If the subtask is completed, remove it from the counselorSelected array
      this.counselorSelected = this.counselorSelected.filter((fs: any) => fs.id !== subtask.id);
    } else {
      // If the subtask is not completed, add it to the counselorSelected array
      this.counselorSelected.push(subtask);
    }
  
    console.log(this.counselorSelected, 'selected counselor');
  }
  
}
