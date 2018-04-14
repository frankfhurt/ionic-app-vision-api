import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Injectable()
export class FaceDetectionService {

    private key: string = 'f61ef3563e884b45abf38c46a469645f';

    private body: {
        file: string
    };
    private url = `https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags`;

    private headers = new Headers();
    private requestOpts = new RequestOptions();
    private toast;

    constructor(public http: Http, private toastCtrl: ToastController) {
        this.toast = this.toastCtrl.create({
            message: 'Vai chamar o webservice',
            duration: 3000,
            position: 'top'
        });
    
        this.toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
     }

    proccessImage(img) {

        // this.headers.append('Content-Type', 'application/json');
        this.headers.append('Content-Type', 'application/octet-stream');
        this.headers.append('Ocp-Apim-Subscription-Key', this.key);

        this.requestOpts.headers = this.headers;

        this.toast.present();

        return fetch(img)
            .then(res => res.blob())
                .then(blob => {
                    return this.http.post(this.url, blob, this.requestOpts);
        })
    }
}