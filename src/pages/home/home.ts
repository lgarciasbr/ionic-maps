import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latLng: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();

    setInterval(func => {
      this.addMarker();
    }, 10 * 1000);
  }
 
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
 
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: this.latLng,
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();
 
    }, (err) => {
      console.log(err);
    });
  }

  addMarker(){
    this.geolocation.getCurrentPosition().then((position) => {
 
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    }, (err) => {
      console.log(err);
    });

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.latLng
    });
   
    let dateTimePosition = new Date();

    let content = "<h4>" + dateTimePosition.toString() + "</h4>";  
    
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
 
}