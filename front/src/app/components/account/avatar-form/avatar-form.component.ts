import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImportMaterialModule } from 'src/app/app.material.module';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.css']
})
export class AvatarFormComponent implements OnInit {
  
  @Input('user') user: User;
  
  file: File;
  userProfileForm: FormGroup;
  progress: { percentage: number } = { percentage: 0 };
  image: File = null;

  uploadImageLabel = 'Choose file (max size 1MB)';
  imageFileIsTooBig = false;
  selectedFileSrc: string;
  selectedFiles: FileList;
  currentFileUpload: boolean = false

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(){
    this.file = this.selectedFiles.item(0)
    if(!this.file){
      return
    }
    this.currentFileUpload = true
    this.progress.percentage = 0
    this.userService.uploadProfileImage(this.authService.getUserFromSessionStorage()._id, this.file).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.user.avatarKey = event.body.avatarKey
        this.authService.setUserToSessionStorage(this.user)
        window.location.reload();
      } 
    },
    (err) => {
      console.log("err",err); 
        this.currentFileUpload = false
    });
  }

}
