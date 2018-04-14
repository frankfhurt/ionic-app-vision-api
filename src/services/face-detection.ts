import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Headers, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Injectable()
export class FaceDetectionService {

    private key: string = 'f61ef3563e884b45abf38c46a469645f';

    private body: {
        file: string
    };
    private url = `https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze`;

    private headers = new Headers();

    constructor(private http: HTTP, private toastCtrl: ToastController) {
    }

    proccessImage(img) {

        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Ocp-Apim-Subscription-Key', this.key);

        let toast = this.toastCtrl.create({
            message: 'Vai chamar o webservice',
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();

        this.http.post(this.url, JSON.stringify({ file: img }), this.headers).then(respose => {
            console.log("RETORNO: " + JSON.parse(respose.data));

            toast.setMessage(JSON.parse(respose.data));

            toast.present();
        }).catch(err => {
            toast.setMessage(err);

            toast.present();
        });

    }
}