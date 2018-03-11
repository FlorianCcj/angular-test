import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VoterComponent } from './voter.component';
/**
 * Testing Property and class bindings - testing event events binding
 * test a getter
 * test presence of a class on an element
 * fake a click
 */
describe('VoterComponent', () => {

  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent); //
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    // fixture.debugElement.queryAll(By.css('.vote-count'));
    // fixture.debugElement.query(By.directive(VoterComponent));
    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el = HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(21);
  });

  it('should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();
    
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();    
  });

  it('should increase total votes when I click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  })
});
