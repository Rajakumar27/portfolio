import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-three-scene',
  imports: [],
  templateUrl: './three-scene.html',
  styleUrl: './three-scene.scss',
})
export class ThreeScene implements AfterViewInit{
  // 3d prism 
  // @ViewChild('canvasContainer') canvasRef!: ElementRef;
  // ngAfterViewInit() {

  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: this.canvasRef.nativeElement,
  //     alpha: true
  //   });

  //   renderer.setSize(window.innerWidth, window.innerHeight);

  //   const geometry = new THREE.BoxGeometry();
  //   const material = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  //   const cube = new THREE.Mesh(geometry, material);

  //   scene.add(cube);
  //   camera.position.z = 3;

  //   const animate = () => {

  //     requestAnimationFrame(animate);

  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;

  //     renderer.render(scene, camera);

  //   };

  //   animate();
  // }
  // 3d Grid lines , neon version with wave effect and mouse interaction
  @ViewChild('gridCanvas') canvasRef!: ElementRef;
  // normal versoin
  //  ngAfterViewInit() {

  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: this.canvasRef.nativeElement,
  //     alpha: true
  //   });

  //   renderer.setSize(window.innerWidth, window.innerHeight);

  //   // grid
  //   const grid = new THREE.GridHelper(200, 50, 0x00ffff, 0x00ffff);

  //   scene.add(grid);

  //   camera.position.y = 10;
  //   camera.position.z = 20;
  //   camera.rotation.x = -0.6;

  //   const animate = () => {

  //     requestAnimationFrame(animate);

  //     grid.position.z += 0.05;

  //     if (grid.position.z > 5) {
  //       grid.position.z = 0;
  //     }

  //     renderer.render(scene, camera);

  //   };

  //   animate();

  // }
  //  neon version with wave effect and mouse interaction
   ngAfterViewInit() {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // grid geometry
    const geometry = new THREE.PlaneGeometry(200, 200, 100, 100);

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true
    });

    const grid = new THREE.Mesh(geometry, material);

    grid.rotation.x = -Math.PI / 2;
    scene.add(grid);

    camera.position.z = 40;
    camera.position.y = 20;

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {

      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;

    });

    const animate = () => {

      requestAnimationFrame(animate);

      const position = geometry.attributes['position'];

      for (let i = 0; i < position.count; i++) {

        const x = position.getX(i);
        const y = position.getY(i);

        const wave =
          Math.sin(x * 0.1 + Date.now() * 0.002) +
          Math.cos(y * 0.1 + Date.now() * 0.002);

        position.setZ(i, wave * 2 + mouseX * 5);

      }

      position.needsUpdate = true;

      renderer.render(scene, camera);

    };

    animate();

  }
  // infinite grid
  //  @ViewChild('canvas') canvasRef!: ElementRef;
  //  ngAfterViewInit() {

  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: this.canvasRef.nativeElement,
  //     antialias: true,
  //     alpha: true
  //   });

  //   renderer.setSize(window.innerWidth, window.innerHeight);

  //   // neon fog for depth
  //   scene.fog = new THREE.Fog(0x000000, 10, 200);

  //   // grid
  //   const grid = new THREE.GridHelper(400, 80, 0xff00ff, 0x00ffff);

  //   scene.add(grid);

  //   grid.rotation.x = Math.PI / 2;

  //   camera.position.z = 50;
  //   camera.position.y = 20;

  //   let speed = 0.5;

  //   const animate = () => {

  //     requestAnimationFrame(animate);

  //     // move grid toward camera
  //     grid.position.z += speed;

  //     if (grid.position.z > 50) {
  //       grid.position.z = 0;
  //     }

  //     renderer.render(scene, camera);

  //   };

  //   animate();

  // }
  // floating tech stack
  //  @ViewChild('skillsCanvas') canvasRef!: ElementRef;
  //   ngAfterViewInit() {

  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: this.canvasRef.nativeElement,
  //     alpha:true
  //   });

  //   renderer.setSize(window.innerWidth, 500);

  //   const textureLoader = new THREE.TextureLoader();

  //   const icons = [
  //     'assets/icons/angular.svg',
  //     'assets/icons/ionic.svg',
  //     'assets/icons/typescript.svg',
  //     'assets/icons/firebase.svg',
  //     'assets/icons/capacitor.svg'
  //   ];

  //   const meshes:any[] = [];

  //   icons.forEach((icon,i)=>{

  //     const texture = textureLoader.load(icon);

  //     const material = new THREE.MeshBasicMaterial({
  //       map:texture,
  //       transparent:true
  //     });

  //     const geometry = new THREE.PlaneGeometry(3,3);

  //     const mesh = new THREE.Mesh(geometry,material);

  //     mesh.position.x = (Math.random()-0.5)*15;
  //     mesh.position.y = (Math.random()-0.5)*10;
  //     mesh.position.z = (Math.random()-0.5)*10;

  //     scene.add(mesh);

  //     meshes.push(mesh);

  //   });

  //   camera.position.z = 15;

  //   const animate = ()=>{

  //     requestAnimationFrame(animate);

  //     meshes.forEach((mesh)=>{

  //       mesh.rotation.y += 0.01;
  //       mesh.rotation.x += 0.005;

  //     });

  //     renderer.render(scene,camera);

  //   }

  //   animate();

  // }
}
