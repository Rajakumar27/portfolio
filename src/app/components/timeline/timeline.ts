import { Component , AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-timeline',
  imports: [LucideAngularModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
  standalone: true
})
export class Timeline implements AfterViewInit{
  @ViewChild('timelineLine') timelineLine!: ElementRef;
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(this.timelineLine.nativeElement, {
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 70%",
        end: "bottom 70%",
        scrub: true
      }
    });
  }

}
