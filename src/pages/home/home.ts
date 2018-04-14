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

      this.service.proccessImage(this.base64Image);
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
