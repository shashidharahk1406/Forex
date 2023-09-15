import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent implements OnInit {
  categoryFilterArr = ['Lead Category 1','Lead Category 2','Lead Category 3','Lead Category 4'];
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption!: string;
 
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
  fiterType:any;
  
  allComplete: boolean = false;
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
selecteAllSnippets(tasks:any){
  console.log(tasks,'TASKS___________')
  if(this.tasks.completed === true){
    this.filterdSnippetList.push(...this.filterdSnippetList,tasks)
  }
 
  // alert(this.filterdSnippetList)
  console.log(this.filterdSnippetList)
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
   
}
