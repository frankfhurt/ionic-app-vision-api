import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FaceDetectionService } from '../../services/face-detection';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public base64Image: string;
  public respose: string;
  public objectResponse;

  constructor(private camera: Camera, public navCtrl: NavController,
    private service: FaceDetectionService, private toastCtrl: ToastController) {
  }

  takePicture(type) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      let toast = this.toastCtrl.create({
        message: 'Tirou a Foto',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

      // var the_file = new Blob([window.atob(imageData)]);
      // var file = new File([the_file], 'img');
      this.service.proccessImage(this.base64Image).then(result => {
        result.subscribe(data => {
          console.log("RETORNO: " + JSON.stringify(data.json()));
          this.objectResponse = data.json();
          this.respose = JSON.stringify(JSON.parse(JSON.stringify(data.json())),null,2);  
        })
      })
      // .subscribe(data => {

      // }, err => {
      //   this.toast.setMessage(err);
      //   this.toast.present();
      // });
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
