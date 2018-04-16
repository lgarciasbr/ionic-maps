import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }
 
  ionViewDidLoad(){
    this.loadMap();

    setInterval(func => {
      this.addMarker();
    }, 2 * 1000);
  }
 
  loadMap(){
    this.geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }).then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
  }

  addMarker(){
    this.geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }).then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      this.map.setCenter(latLng)

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      
      let content = "<h4>" + position.coords.accuracy + "m" + "</h4>"; 

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
  
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });

    }, (err) => {
      console.log(err);
    });

  }
 
}
