import { Component, HostListener, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  imports: [LucideAngularModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  standalone: true
})
export class Skills implements AfterViewInit {
  @ViewChildren('skillCard') cards!: QueryList<ElementRef>;

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cards.forEach(card => {
      const rect = card.nativeElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update the CSS variables for the glow effect
      card.nativeElement.style.setProperty('--mouse-x', `${x}px`);
      card.nativeElement.style.setProperty('--mouse-y', `${y}px`);
    });
  }
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      this.cards.forEach((cardRef: ElementRef) => {
        const firstSkill = cardRef.nativeElement.querySelector('.skills-list span');
        firstSkill?.click();
      });
    }, 300);

    // 🔥 Magnetic Hover Effect
    this.cards.forEach((cardRef: ElementRef) => {
      const card = cardRef.nativeElement;

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 15;
        const moveY = (y - rect.height / 2) / 15;

        gsap.to(card, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }
  updateSkill(event: any, value: number) {
    const card = event.target.closest('.skill-card');
    const progress = card.querySelector('.progress');

    // Remove active class
    card.querySelectorAll('span').forEach((el: any) => {
      el.classList.remove('active-skill');
    });

    // Add active to selected
    event.target.classList.add('active-skill');

    // Animate progress
    gsap.to(progress, {
      width: value + '%',
      duration: 0.6,
      ease: 'power3.out'
    });
  }
}
