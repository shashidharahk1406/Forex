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
  deletedItems: any = [];
  alterNativeArr: any = [];
  showHint: boolean = true;
  showHintFilter:boolean = true;
  checked:boolean = false
  indeterminateChecked:any;
  constructor() { }

  ngOnInit(): void {
   
  }
  openOptionPanel(items:any){
    
    this.selectedArr.push(items)
    this.filteredArray =  [...this.selectedArr]
    if( this.filteredArray.length <0){
      this.showHint = true
    }
    else{
      this.showHint = false
    }
   }
   selectedSnippets(items: any) {
    this.snippetList.push(items);
    this.filterdSnippetList = this.snippetList;
    console.log(this.filterdSnippetList,"OPTIONSSS")
    if(this.filterdSnippetList.length < 0){
      this.showHintFilter = true
    }
    else{
      this.showHintFilter = false
    }
  }
 
  removeList(items: any) {
    let index = this.filterdSnippetList.indexOf(items);
    console.log('Items:', items);
    console.log('filterdSnippetList:', this.filterdSnippetList);
    console.log('Index:', index);
   
    if (index !== -1) {
      this.filterdSnippetList.splice(index, 1);
      console.log('After removal:', this.filterdSnippetList.length);
      if(this.filterdSnippetList.length > 0){
        this.showHintFilter = false
      }
      else{
        this.showHintFilter = true
      }
    }
    
  }
  
}
