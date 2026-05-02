import { Component, AfterViewInit, ElementRef, ViewChild , HostListener} from '@angular/core';
import { LucideAngularModule} from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  standalone: true
})
export class Projects implements AfterViewInit {
  @ViewChild('sectionRef') sectionRef!: ElementRef;
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private mesh!: THREE.Mesh;

  ngAfterViewInit() {
     this.initThree();
    this.animate();
    gsap.registerPlugin(ScrollTrigger);
    const section = this.sectionRef.nativeElement;
    const scrollContent = this.scrollRef.nativeElement;

    gsap.to(scrollContent, {
      x: () => -(scrollContent.scrollWidth - window.innerWidth), // Slide to the end
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + (scrollContent.scrollWidth - window.innerWidth),
        scrub: 1, // Smoothly ties animation to scroll progress
        pin: true, // "Sticks" the section while moving horizontally
        anticipatePin: 1,
      }
    });
  }
  private initThree() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      if(this.mobileOnly)
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  
      // Create a geometric shape (Icosahedron)
      const geometry = new THREE.IcosahedronGeometry(2, 1); // Radius 2, detail 1
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x38bdf8, 
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
  
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
  
      this.camera.position.z = 5;
    }
  
    private animate() {
      requestAnimationFrame(() => this.animate());
      
      // Slow, elegant rotation
      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.005;
  
      this.renderer.render(this.scene, this.camera);
    }
    get mobileOnly(): boolean {
    return window.innerWidth <= 768;
  }
     @HostListener('window:resize')
  onWindowResize() {
    if (this.camera && this.renderer) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

}
