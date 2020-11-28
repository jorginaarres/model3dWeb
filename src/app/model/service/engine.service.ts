import * as THREE from 'three';
import * as THREESTLLoader from 'three-stl-loader';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ModelConfiguration} from '../modelConfiguration';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private frameId: number = null;
  private controls: any;
  private mesh: THREE.Mesh;
  private modelConfig: ModelConfiguration;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas:  this.canvas});
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xBDBDBD );

    // camera
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 10000 );
    this.camera.position.set( 0, -120, 120 );
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.scene.add( new THREE.AmbientLight( 0x222222 ) );
    this.scene.add( this.camera ); // required, because we are adding a light as a child of the camera

    // lights
    const light = new THREE.PointLight( 0xffffff, 0.8 );
    this.camera.add( light );

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
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

  public changeModel(path: string): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xF0F0F0);
    this.scene.add( new THREE.AmbientLight( 0x141414 ) );
    this.scene.add( this.camera );
    const STLLoader = new THREESTLLoader(THREE);
    const loader = new STLLoader();
    loader.load(path, geometry => {
      const material = new THREE.MeshPhongMaterial
      ( { color: this.modelConfig.color} );
      geometry.scale = this.modelConfig.scale;
      this.mesh = new THREE.Mesh( geometry, material );
      this.scene.add(this.mesh);
    });

    const floorGeometry = new THREE.BoxBufferGeometry(100,100,0);
    const texture = new THREE.TextureLoader().load( '../../assets/floorTexture.jpg' ); 
    const floorMaterial = new THREE.MeshBasicMaterial( {map: texture} );
    const floor = new THREE.Mesh(floorGeometry,floorMaterial);
    this.scene.add(floor);

    this.animate();
  }

  public updateModelConfiguration(config: ModelConfiguration): void {
    this.mesh.material = new THREE.MeshPhongMaterial( { color: config.color} );
    this.mesh.geometry.scale(config.scale, config.scale, config.scale);
    this.animate();
  }

  public setConfiguration(config: ModelConfiguration): void {
    this.modelConfig = config;
  }
}
