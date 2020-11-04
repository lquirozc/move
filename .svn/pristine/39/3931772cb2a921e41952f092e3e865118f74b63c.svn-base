import { Component, Input, Injectable, NgModule, ViewContainerRef, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable, Subscription } from 'rxjs';

export interface ContentAdminDescriptor {
  placeholder: string;
  elementRef: ElementRef;
}

@Injectable()
export class ContentAdminService {
  contentInit$ = new Subject<ContentAdminDescriptor>();

  contentInit(): Observable<ContentAdminDescriptor> {
    return this.contentInit$.asObservable();
  }

  registerContent(content: ContentAdminDescriptor) {
    this.contentInit$.next(content);
  }
}

@Component({
  selector: 'master-admin-content',
  template: '<ng-content></ng-content>'
})
export class ContentAdminComponent {
  @Input() placeholder: string;

  constructor(
    private elementRef: ElementRef,
    private contentService: ContentAdminService
  ) { }

  ngOnInit() {
    this.contentService.registerContent({
      placeholder: this.placeholder,
      elementRef: this.elementRef
    });
  }
}

@Component({
  selector: 'master-admin-placeholder',
  template: '<ng-content></ng-content>'
})
export class PlaceholderAdminComponent {
  @Input() name: string;

  subscription: Subscription;

  constructor(
    private containerRef: ViewContainerRef,
    private contentService: ContentAdminService
  ) {
    this.subscription = contentService.contentInit().subscribe((content: ContentAdminDescriptor) => {
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

@NgModule({
  declarations: [PlaceholderAdminComponent, ContentAdminComponent],
  exports: [PlaceholderAdminComponent, ContentAdminComponent],
  providers: [ContentAdminService],
  imports: [
    CommonModule
  ]
})
export class MasterAdminModule { }






