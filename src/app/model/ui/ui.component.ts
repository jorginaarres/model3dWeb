import { Component, OnInit } from '@angular/core';
import {EngineService} from '../service/engine.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ModelConfiguration} from '../modelConfiguration';
import {SocketService} from "../service/socket.service";


@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  selected: any;
  formGroup: any;

  models: any[] = [
    {name: 'Cat', path: '../../assets/cat.stl'},
    {name: 'Dragon', path: '../../assets/dragon.stl'},
  ];

  constructor(private engServ: EngineService, private formBuilder: FormBuilder, private socketService: SocketService) { }

  ngOnInit(): void {
    this.engServ.changeModel('../../assets/cat.stl');

    const modelConfiguration: ModelConfiguration = {
      color: '#00FF00',
      scale: 1
    };

    this.engServ.setConfiguration(modelConfiguration);
    this.socketService.setConfiguration(modelConfiguration);
    this.changeModel('../../assets/cat.stl');
  }


  changeModel(model: any): void {
    this.formGroup = this.formBuilder.group({
      model: ['../../assets/cat.stl', [Validators.required]],
      red: [0, [Validators.required]],
      green: [255, [Validators.required]],
      blue: [0, Validators.required],
      scale: [1, Validators.required]
    });

    this.engServ.changeModel(model);
  }

  submit(): void {
    const r = this.formGroup.get('red').value.toString(16).padStart(2, '0').toUpperCase();
    const g = this.formGroup.get('green').value.toString(16).padStart(2, '0').toUpperCase();
    const b = this.formGroup.get('blue').value.toString(16).padStart(2, '0').toUpperCase();
    const s = parseFloat(this.formGroup.get('scale').value);

    const modelConfiguration: ModelConfiguration = {
      color: '#' + r + g + b,
      scale: s
    };

    this.engServ.updateModelConfiguration(modelConfiguration);
  }
}
