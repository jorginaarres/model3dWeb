import { Component, OnInit } from '@angular/core';
import {EngineService} from '../service/engine.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ModelConfiguration} from '../modelConfiguration';
import {SocketService} from '../service/socket.service';


@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  selected: any;
  formGroup: any;
  submitted=false;

  models: any[] = [
    {name: 'Cat', path: '../../assets/cat.stl'},
    {name: 'Dragon', path: '../../assets/dragon.stl'},
    {name: 'Bird', path: '../../assets/bird.stl'},
    {name: 'Ship', path: '../../assets/ship.stl'},
  ];

  constructor(private engServ: EngineService, private formBuilder: FormBuilder, private socketService: SocketService) { }

  ngOnInit(): void {
    const modelConfiguration: ModelConfiguration = {
      color: '#00FF00',
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
    };

    this.engServ.setConfiguration(modelConfiguration);
    this.socketService.setConfiguration(modelConfiguration);
    this.changeModel('../../assets/cat.stl');
  }


  changeModel(model: any): void {
    this.formGroup = this.formBuilder.group({
      model: ['../../assets/cat.stl', [Validators.required]],
      red: [0, [Validators.required,Validators.min(0),Validators.max(255)]],
      green: [255, [Validators.required,Validators.min(0),Validators.max(255)]],
      blue: [0, [Validators.required,Validators.min(0),Validators.max(255)]],
      scaleX: [1, [Validators.required,Validators.min(0),Validators.max(4)]],
      scaleY: [1, [Validators.required,Validators.min(0),Validators.max(4)]],
      scaleZ: [1, [Validators.required,Validators.min(0),Validators.max(4)]],
      rotateX: [0, [Validators.required,Validators.min(0),Validators.max(360)]],
      rotateY: [0, [Validators.required,Validators.min(0),Validators.max(360)]],
      rotateZ: [0, [Validators.required,Validators.min(0),Validators.max(360)]],
      translateX: [0, [Validators.required,Validators.min(0),Validators.max(10)]],
      translateY: [0, [Validators.required,Validators.min(0),Validators.max(10)]],
      translateZ: [0, [Validators.required,Validators.min(0),Validators.max(10)]]
    });

    this.engServ.changeModel(model);
  }

  get f() { return this.formGroup.controls; }

  submit(): void {
    this.submitted=true
    if (this.formGroup.invalid) {
      return;
    }
    const r = this.formGroup.get('red').value.toString(16).padStart(2, '0').toUpperCase();
    const g = this.formGroup.get('green').value.toString(16).padStart(2, '0').toUpperCase();
    const b = this.formGroup.get('blue').value.toString(16).padStart(2, '0').toUpperCase();
    const sx = parseFloat(this.formGroup.get('scaleX').value);
    const sy = parseFloat(this.formGroup.get('scaleY').value);
    const sz = parseFloat(this.formGroup.get('scaleZ').value);

    const rx = parseFloat(this.formGroup.get('rotateX').value);
    const ry = parseFloat(this.formGroup.get('rotateY').value);
    const rz = parseFloat(this.formGroup.get('rotateZ').value);

    const tx = parseFloat(this.formGroup.get('translateX').value);
    const ty = parseFloat(this.formGroup.get('translateY').value);
    const tz = parseFloat(this.formGroup.get('translateZ').value);

    const modelConfiguration: ModelConfiguration = {
      color: '#' + r + g + b,
      scaleX: sx,
      scaleY: sy,
      scaleZ: sz,
      rotateX: rx,
      rotateY: ry,
      rotateZ: rz,
      translateX: tx,
      translateY: ty,
      translateZ: tz,
    };

    this.engServ.updateModelConfiguration(modelConfiguration);
  }
}
