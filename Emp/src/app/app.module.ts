import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
//import { NgbdToastInline } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    })
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
