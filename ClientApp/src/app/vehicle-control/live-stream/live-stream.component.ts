import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit {

  @ViewChild('videoStream', { static: true }) video!: ElementRef<HTMLVideoElement>;


  constructor(@Inject(PLATFORM_ID) private _platform: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((ms: MediaStream) => {
        const _video = this.video.nativeElement;
        _video.srcObject = ms;
        _video.play();
      });
    }
  }

  onStop() {
    this.video.nativeElement.pause();
    (this.video.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
    this.video.nativeElement.srcObject = null;
  }

  ngOnDestroy() {
    (this.video.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
  }

}
