import { Component, OnInit, Input, forwardRef, OnChanges, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mv-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit {

  @ViewChild('selectionArea') selectionArea: ElementRef;
  @ViewChild('buttonSelect') buttonSelect: ElementRef;

  @Input() dataOptions: Array<any> = [];
  @Input() customIcon: string = 'icon-globe-solid';
  @Input() activeIndex: number = 0;

  isActive: boolean = false;

  @Output() private valueChange = new EventEmitter();
  counter: number = 0;
  value: dropDown = {
    key: '',
    value: 'Seleccione'
  };
  isDisabled: boolean;
  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {

      if (e.target !== this.selectionArea.nativeElement && e.target !== this.buttonSelect.nativeElement) {
        this.isActive = false;
      }
    });


  }

  activateSelect() {
    this.isActive = !this.isActive;
    // this.hiddenInputSelect.nativeElement.focus();
  }

  leaveSelect() {
    this.isActive = false;
  }

  selectItem(index) {

    this.isActive = false;
    this.value = {
      key: this.dataOptions[index].key,
      value: this.dataOptions[index].value
    };

    this.onTouch();
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: dropDown): void {
    if (value) {
      this.value = value;
    } else {
      this.value = {
        key: '',
        value: 'Selecciona un maestro',
      };
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  ngOnInit(): void {
    // this.value = {
    //   key: this.dataOptions[0].key,
    //   value: this.dataOptions[0].value
    // };
  }
}

export interface dropDown {
  key: any;
  value: any;
}
