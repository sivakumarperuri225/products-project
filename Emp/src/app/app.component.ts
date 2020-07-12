
import { Component ,OnInit,ViewChild, ElementRef,PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, Validators ,NgForm} from '@angular/forms';
import { empty } from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  itemsForm: FormGroup;
  editForm:FormGroup;
  submitted = false;
  url: any;
 // model: NgbDateStruct;
  date: {year: number, month: number};
  model: any = {};
  model2: any = {}; 
  validation: any = {};
  title:any;
  //checkbox
  selectedRow: Number;
  checkboxes: boolean[];

  //image upload
  public imagePath;
  imgURL: any;
  public message: string;

  itemsData:any=[
           {itemName:"refregitror",itemImage:"",itemPrice:"10.23",itemDescription:"use to store some items",itemAdditionDate:"11.03.1245"},
           {itemName:"ac",itemImage:"",itemPrice:"15.23",itemDescription:"uses in summmer",itemAdditionDate:"10.06.1245"},
           {itemName:"fan",itemImage:"",itemPrice:"5.23",itemDescription:"to get air",itemAdditionDate:"10.02.1245"},
           {itemName:"bike",itemImage:"",itemPrice:"15.23",itemDescription:"race",itemAdditionDate:"10.02.1245"},
    ]
    
    //checkbox
    @ViewChild('focus', { static: false }) input: ElementRef;
    public toggleButton: boolean = true;

    constructor(private formBuilder: FormBuilder,
      private toastr:ToastrService) {
     
    }
    
   
    ngOnInit() {
      this.title="Add Product";
      this.itemsForm = this.formBuilder.group({
        itemName: ['', Validators.required],
        itemPrice: ['', Validators.required],
        itemDescription: ['', Validators.required],
        itemAdditionDate: ['', [Validators.required]],
       
      });
      
      //checkbox 
      this.checkboxes = new Array(this.itemsData.length);
      this.checkboxes.fill(false);

    }
    
    //checkbox
    setClickedRow(index) {
    this.selectedRow = index;
    }

  //checkbox
  toggleSelection(event, i) {
    this.checkboxes[i] = event.target.checked;
  }

  //actions Btn for bulkDelete
  delete() {
    debugger;
   // alert("At least one row should be present.")
    var atleastOneSelected = this.checkboxes.some(checkbox => checkbox === true);

    var allSelected = this.checkboxes.every(checkbox => checkbox === true);
    
    if (!atleastOneSelected) {
       alert("No rows selected.")
      // this.toastr.success('No rows selected.');
      return;
    }

    if (allSelected) {
      alert('At least one row should be present..')
      //this.toastr.success('At least one row should be present..');
      return;
    }
    

    for (let i = this.checkboxes.length-1; i >= 0; i--) {
      // If selected, then delete that row.
      if (this.checkboxes[i]) {
        this.itemsData.splice(i, 1);
        //this.toastr.success('sucess');
      }
    }
   
   
  }

    // convenience getter for easy access to form fields
    get f() { return this.itemsForm.controls; }
    //get fe() { return this.editForm.controls; }

    onSubmit() {
      let valid=true;
      debugger;
      if(this.itemsForm.valid){
          if(this.myValue==null){
            this.itemsData.push(this.model);
            //this.toastr.success('Uploaded Successfully.');
            //this.reset(this.itemsForm);
            alert('Uploaded Successfully.');   
           // this.itemsForm.nativeElement.reset()
        console.log(this.model)
        this.model = {};
        this.title="Add Product";
         }
         else{
            let editIteminfo = this.myValue;
            for(let i = 0; i < this.itemsData.length; i++) {
              if(i == editIteminfo) {
                this.itemsData[i] = this.model;
                this.model = {};
                this.title="Add Product";
                //this.reset(this.itemsForm);
                //this.toastr.success('Uploaded Successfully.');
                alert('Uploaded Successfully.');   
                //this.itemsForm.nativeElement.reset()
                this.myValue=null;
              }
            }
          }
      }
   

      this.submitted = true;

      // stop here if form is invalid
      // if (this.itemsForm.invalid) {
      //     return;
      // }
      
      // display form values on success
     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.itemsForm.value, null, 4));

     
      }
      // reset(itemsForm) {
      //   this.submitted = false;
      //   this.model.imgURL = null;
      //   itemsForm.reset();
      // }
   
    myValue;

    editItem(editIteminfo) {
      
      debugger;
      this.model={};
      this.model.itemName = this.itemsData[editIteminfo].itemName;
      this.model.itemPrice = this.itemsData[editIteminfo].itemPrice;
      this.model.itemDescription = this.itemsData[editIteminfo].itemDescription;
      this.model.itemAdditionDate = this.itemsData[editIteminfo].itemAdditionDate;
      this.model.itemImage = this.itemsData[editIteminfo].itemImage;
      this.myValue = editIteminfo;
      this.title="Edit Product";
     // this.itemsForm.touched=false;
    
    }
  
    updateItem(){
      let editIteminfo = this.myValue;
      for(let i = 0; i < this.itemsData.length; i++) {
        if(i == editIteminfo) {
          this.itemsData[i] = this.model2;
          this.model2 = {};
        }
      }
    }
  

    deleteItem(i) {
      this.itemsData.splice(i);
      console.log(i);
    }


   //upload image
   preview(files) {
    if (files.length === 0)
      return;
  
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
  
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
        this.model.imgURL = reader.result; 
        this.model.imgName = files[0].name; 
    }
    
  }





}
