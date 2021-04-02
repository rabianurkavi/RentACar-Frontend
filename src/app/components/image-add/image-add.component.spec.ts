import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAddComponent } from './image-add.component';

describe('ImageAddComponent', () => {
  let component: ImageAddComponent;
  let fixture: ComponentFixture<ImageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
