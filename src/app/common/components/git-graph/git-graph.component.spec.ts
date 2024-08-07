import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitGraphComponent } from './git-graph.component';

describe('GitGraphComponent', () => {
  let component: GitGraphComponent;
  let fixture: ComponentFixture<GitGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GitGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
