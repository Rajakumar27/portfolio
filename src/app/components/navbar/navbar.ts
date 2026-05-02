import { Component , AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar implements AfterViewInit {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Prevent background scroll when menu is open
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
@ViewChild('navbar') navbar!: ElementRef;
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.nav-container', {
      scrollTrigger: {
        trigger: '.nav-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      // animation properties
    });
  }
}
