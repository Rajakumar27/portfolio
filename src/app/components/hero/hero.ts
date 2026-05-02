import { Component ,AfterViewInit, ElementRef, ViewChild,HostListener} from '@angular/core';
import { gsap } from 'gsap';
// import { ThreeScene } from '../three-scene/three-scene'; // add ThreeScene in imports to use it
import { NgxParticlesModule } from '@tsparticles/angular';// Ensure you have the angular wrapper installed
import { MoveDirection, OutMode } from "@tsparticles/engine";
import { loadFull } from "tsparticles"
import { LucideAngularModule } from 'lucide-angular';
// import { RouterOutlet } from '@angular/router'; add RouterOutlet in imports if you want to use routing
import * as THREE from 'three';
@Component({
  selector: 'app-hero',
  imports: [ LucideAngularModule, NgxParticlesModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  standalone: true,
})
export class Hero implements AfterViewInit{
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroTitle1') heroTitle1!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroActions') heroActions!: ElementRef;
  @ViewChild('typingEffect') typingEffect!: ElementRef;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  sentences = [
  "Software engineer.",
  "Application developer.",
  "Building smooth, scalable apps.",
  "Crafting creative digital experiences.",
  "Always learning, always growing.",
];
particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: { enable: true, delay: 0  }
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } }
      }
    },
    particles: {
      color: { value: "#38bdf8" },
      links: { color: "#38bdf8", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1, direction: MoveDirection.none, outModes: { default: OutMode.out } },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } }
    }
  };

  async particlesInit(engine: any): Promise<void> {
    await loadFull(engine);
  }
  ngAfterViewInit() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.5 } });
    // Staggered entrance animation
    tl.from([this.heroTitle.nativeElement, this.heroTitle1.nativeElement], {
      y: 100,
      opacity: 0,
      delay: 0.8
    })
    .from(this.heroSubtitle.nativeElement, {
      y: 50,
      opacity: 0
    }) // Start 0.8s before title finish
    .from([this.heroActions.nativeElement, this.typingEffect.nativeElement], {
      scale: 0.9,
      opacity: 0
    });
    setTimeout(() => {
      this.startTypingEffect();
    }, 2000);
  }

  // Handle window resizing to keep the 3D object centered
  @HostListener('window:resize')
  onWindowResize() {
    if (this.camera && this.renderer) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  @HostListener('mousemove', ['$event'])
onMouseMove(e: MouseEvent) {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculate move amount
  const moveX = (clientX - centerX) / 50;
  const moveY = (clientY - centerY) / 50;

  // Tilt the photo system
  gsap.to('.photo-system', {
    x: moveX * 2,
    y: moveY * 2,
    rotateY: moveX,
    rotateX: -moveY,
    duration: 0.3,
    ease: "power2.out",
    overwrite: true 
  });

  // Shift the Three.js background slightly for "Parallax" effect
  // gsap.to('.three-canvas', {
  //   x: moveX * 5,
  //   y: moveY * 5,
  //   duration: 1.2
  // });
}
startTypingEffect() {
  let sentenceIndex = 0;
  const typeSentence = (sentence: string, callback: () => void) => {
  let i = 0;
  this.typingEffect.nativeElement.textContent = '';

  const type = () => {
    if (i < sentence.length) {
      this.typingEffect.nativeElement.textContent += sentence[i];
      i++;
      setTimeout(type, 50);
    } else {
      setTimeout(callback, 1200);
    }
  };

  setTimeout(() => type(), 500); // delay before typing
};

  const nextSentence = () => {
    typeSentence(this.sentences[sentenceIndex], () => {
      sentenceIndex = (sentenceIndex + 1) % this.sentences.length;
      nextSentence();
    });
  };

  nextSentence();
}

}
