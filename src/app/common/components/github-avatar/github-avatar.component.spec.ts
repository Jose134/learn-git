import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAvatarComponent } from './github-avatar.component';

describe('GithubAvatarComponent', () => {
  let component: GithubAvatarComponent;
  let fixture: ComponentFixture<GithubAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GithubAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
