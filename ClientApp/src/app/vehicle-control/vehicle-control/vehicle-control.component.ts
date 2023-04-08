import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-vehicle-control',
  templateUrl: './vehicle-control.component.html',
  styleUrls: ['./vehicle-control.component.css']
})
export class VehicleControlComponent {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  zoom = 5;
  public ugvLocation: google.maps.LatLngLiteral = { lat: 30.1055, lng: 31.3854 };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 1,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };


  vehiclemarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    label: "UGV"
  };

  markerPositions: google.maps.LatLngLiteral[] = [
    {
      lat: 30.830023851,
      lng: 28.8830566406,
    }
  ];


  missions = [{
    missionId: 1234,
    missionName: "mission 1",
    noOfSurvivors: 5
  }]

  ngOnInit() {
    const directionsService = new google.maps.DirectionsService();

    const request: google.maps.DirectionsRequest = {
      origin: this.ugvLocation,
      destination: this.markerPositions[0],
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: this.map.googleMap,
          suppressMarkers: true
        });
        directionsRenderer.setDirections(result);
      }
    });
  }


  calculateAndDisplayRoute() {

  }

}
