import * as THREE from 'three';
import * as THREESTLLoader from 'three-stl-loader';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private frameId: number = null;
  private controls: any;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document

    this.canvas = canvas.nativeElement;
// renderer
    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas:  this.canvas});
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xFFFFFF );

    // camera
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 10000 );
    this.camera.position.set( 113, 111, 113 );
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.scene.add( new THREE.AmbientLight( 0x222222 ) );
    this.scene.add( this.camera ); // required, because we are adding a light as a child of the camera

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // lights
    const light = new THREE.PointLight( 0xffffff, 0.8 );
    this.camera.add( light );

    const STLLoader = new THREESTLLoader(THREE);
    const loader = new STLLoader();
    loader.load('../../assets/dragon.stl', geometry => {
      const material = new THREE.MeshPhongMaterial( { color: 0x00FF00 } );

      const mesh = new THREE.Mesh( geometry, material );
      this.scene.add(mesh);
    })

    //request animation
    this.animate();
/*
    const STLLoader = new THREESTLLoader(THREE);
    const loader = new STLLoader();
    loader.load('../../assets/dragon.stl', geometry => {
      const material = new THREE.MeshLambertMaterial({color: 0x000666});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      this.scene.add( mesh );
    } );*/



  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}
