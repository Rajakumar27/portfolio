import { Component, signal , AfterViewInit, ViewChild, ElementRef} from '@angular/core';
// import { RouterOutlet } from '@angular/router'; add RouterOutlet in imports if you want to use routing
import { About,  } from './components/about/about';
import { Contact,  } from './components/contact/contact';
import { Projects,  } from './components/projects/projects';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Skills } from './components/skills/skills';
import { Timeline } from './components/timeline/timeline';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ThreeScene } from './components/three-scene/three-scene';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ About, Contact, Projects, Footer, Hero, Navbar, Skills, Timeline, ThreeScene, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  protected readonly title = signal('raja-portfolio');
  @ViewChild('cursor') cursor!: ElementRef;
  ngOnInit() {
    AOS.init({
      duration: 1000, // Animation length in ms
      once: false,    // Whether animation should happen only once
      mirror: true,   // Whether elements should animate out while scrolling past them
    });
  }
  ngAfterViewInit() {
    window.addEventListener('mousemove', (e) => {
      gsap.to(this.cursor.nativeElement, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    });
     AOS.refresh();
  }
}
