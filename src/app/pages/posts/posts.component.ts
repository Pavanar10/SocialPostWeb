import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable,finalize } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  selectedFile:any;
  text='';
  posts:Array<any>=[];
constructor(public userService:UserService,private router:Router,private storage:AngularFireStorage,private postService:PostService,
  private snackbar:MatSnackBar
){

}
ngOnInit(): void {
  if(this.userService.user === undefined || this.userService.user===null){
    let str = localStorage.getItem('user');
    if(str !== null){
      this.userService.user=JSON.parse(str);
    }else
    this.router.navigate(['/login']);
  }

  this.postService.getPosts().then((res:any)=>{
    this.posts=res;
    for(let post of this.posts){
      this.commentText.push('');
    }
  }).catch((ree)=>{
    console.log(ree)
  })
}

postSchema={
  username:'',
  imageURL:'',
  text:'',
likes:[],
comments:[{username:'',comment:''}]
}
commentText:Array<string>=[];

comment(postId:number,commentIndex:number){
  for(let i=0; i<this.posts.length;i++){
    if(this.posts[i].id ===postId){
     let commentObj = {
      username:this.userService.user.username,
      comment:this.commentText[commentIndex],
     }
     this.posts[i].comments.push(commentObj);
     console.log(this.posts);
     this.commentText[commentIndex]='';

     this.postService.updateComment(this.posts[i]);
    }
  }  
}


onFileSelected(event:any){
    this.selectedFile===event.target.files[0];

}
post(){

  this.snackbar.open('Creating the post....','',{duration:15000})
  if(this.selectedFile!== undefined || this.selectedFile!==null){
    this.uploadImage().then((url)=>{
      console.log(url);
      let postObj={
        username:this.userService.user.username,
        text:this.text,
        imageURL:url,
        likes:[],
        comments:[]
      };
this.posts.push(postObj);
      this.postService.saveNewPost(postObj).then((res)=>{
        console.log(res)
        this.snackbar.open('posted successfully','ok');
      }).catch((err)=>{
        console.log(err)
      });
      this.selectedFile=undefined;
    }).catch((error)=>{
      console.log(error)
    })
  }else{
    let postObj={
      username:this.userService.user.username,
      text:this.text,
      imageURL:'',
      likes:[],
      comments:[]
    };
this.posts.push(postObj);
    this.postService.saveNewPost(postObj).then((res)=>{
      console.log(res);
      this.snackbar.open('posted successfully','ok');

    }).catch((err)=>{
      console.log(err)
    })
  }
}
/*uploadImage(){
  return new Promise((resolve,reject)=>{
    let n = Date.now();
    const file = this.selectedFile;
    const filepath =`images/${n}`;
    const fileref = this.storage.ref(filepath);
    const task = this.storage.upload(`images/${n}`,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let imageUrl=fileref.getDownloadURL();
        imageUrl.subscribe((url:any)=>{
          if(url){
            console.log(url.toString());
            resolve(url)
          }
        })
      })
    ).subscribe((url)=>{
      if(url){
        console.log(url)
      }
    })
  })
}*/



uploadImage() {
  return new Promise((resolve, reject) => {
    let n = Date.now();
    const file = this.selectedFile;
    const filePath = `images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`images/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let imageURL = fileRef.getDownloadURL();
        imageURL.subscribe((url: any) => {
          if (url) {
            console.log(url);
            resolve(url);
          }
        });
      })
    ).subscribe(
      (url)=>{
        if(url){
          console.log(url);
        }
      }
    );
  });
}
like(postId:number){
  for(let i=0; i<this.posts.length;i++){
    if(this.posts[i].id ===postId){
      if(this.posts[i].likes.indexOf(this.userService.user.id)>=0){
        this.posts[i].likes.splice(this.posts[i].likes.indexOf(this.userService.user.id),1);
      }else
      this.posts[i].likes.push(this.userService.user.id);

      this.postService.updateLikes(this.posts[i]).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}

}



