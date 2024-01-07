import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReaderComponent } from './post-reader.component';

describe('PostReaderComponent', () => {
  let component: PostReaderComponent;
  let fixture: ComponentFixture<PostReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
