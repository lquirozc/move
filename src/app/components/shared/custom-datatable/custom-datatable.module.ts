import { Component, Input, Injectable, NgModule, ViewContainerRef, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';


export interface ContentDatatableDescriptor {
  placeholder: string;
  elementRef: ElementRef;
}

@Injectable()
export class ContentDatatableService {
  contentInit$ = new Subject<ContentDatatableDescriptor>();

  contentInit(): Observable<ContentDatatableDescriptor> {
    return this.contentInit$.asObservable();
  }

  registerContent(content: ContentDatatableDescriptor) {
    this.contentInit$.next(content);
  }
}

@Component({
  selector: 'custom-table-content',
  template: '<ng-content></ng-content>'
})
export class ContentDatatableComponent {
  @Input() placeholder: string;

  constructor(
    private elementRef: ElementRef,
    private contentService: ContentDatatableService
  ) { }

  ngOnInit() {
    this.contentService.registerContent({
      placeholder: this.placeholder,
      elementRef: this.elementRef
    });
  }
}

@Component({
  selector: 'custom-table-placeholder',
  template: '<ng-content></ng-content>'
})
export class PlaceholderDatatableComponent {
  @Input() name: string;

  subscription: Subscription;

  constructor(
    private containerRef: ViewContainerRef,
    private contentService: ContentDatatableService
  ) {
    this.subscription = contentService.contentInit().subscribe((content: ContentDatatableDescriptor) => {
      if (content.placeholder == this.name) {
        this.containerRef.clear();
        this.containerRef.element.nativeElement.appendChild(content.elementRef.nativeElement);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Injectable()
export class CustomDatatableService {
  isNew$ = new BehaviorSubject<boolean>(false);
  isEditing$ = new BehaviorSubject<boolean>(false);

  reset(): void {
    this.isNew$.next(false);
    this.isEditing$.next(false);
  }
}

@NgModule({
  declarations: [PlaceholderDatatableComponent, ContentDatatableComponent],
  exports: [PlaceholderDatatableComponent, ContentDatatableComponent],
  providers: [ContentDatatableService, CustomDatatableService],
  imports: [
    CommonModule
  ]
})
export class CustomDatatableModule { }
