import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { stepsTour } from '@constants/tour.constant';

import { ITour } from '@interfaces/tour.interface';

import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('progress') progress: ElementRef;
  @ViewChild('slidePage') slidePage: ElementRef;
  @ViewChild('pages') pagesWrapper: ElementRef;
  @ViewChildren('step') steps: QueryList<ElementRef>;
  @ViewChildren('page') pages: QueryList<ElementRef>;
  @ViewChild('modalTour') modalTour: ElementRef;

  private marginLeft: number = 20;
  private currentStep: number = 1;

  private modalSubscription: Subscription;

  itemStepsTour: ITour[];
  firstItemStepTour: ITour;

  prev: boolean = false;
  next: boolean = false;
  final: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.modalSubscription = this.userService.showModalEmitter.subscribe(resp => resp ? this.showModal(): this.hideModal());
    this.firstItemStepTour = stepsTour[0];
    const [ first, ...rest ] = stepsTour;
    this.itemStepsTour = rest;
  }

  private showModal(): void {
    this.modalTour.nativeElement.classList.add('modal-open');
  }

  private hideModal(): void {
    this.modalTour.nativeElement.classList.remove('modal-open');
  }

  ngAfterViewInit() {
    this.pagesWrapper.nativeElement.style.width = ((this.pages.length - 1) * 100).toString().concat("%");
  }

  prevStep(): void {
    this.currentStep--;
    this.slidePage.nativeElement.style.marginLeft = this.getNewMargin(true);
    if(this.currentStep < 1) {
      this.currentStep = 1;
    }
    this.updateSteps();
  }

  nextStep(): void {
    this.slidePage.nativeElement.style.marginLeft = this.getNewMargin();
    this.currentStep++;
    if (this.currentStep > this.steps.length) {
      this.currentStep = this.steps.length;
    }
    this.updateSteps();
  }

  private getNewMargin(prev: boolean = false): string {
    const newCurrent = !prev ? this.currentStep : this.currentStep - 1;
    return (newCurrent * -this.marginLeft).toString().concat('%');
  }

  updateTour(): void {
    this.userService.changeTourVisibilityLocal();
  }

  private updateSteps(): void {
    this.steps.forEach((step, i) => {
      if (i < this.currentStep) step.nativeElement.classList.add('active');
      else step.nativeElement.classList.remove('active');
    });
    const activeSteps = document.querySelectorAll('.active');
    this.progress.nativeElement.style.width =  ((activeSteps.length - 1) / (this.steps.length - 1)) * 100 + "%";
    if (this.currentStep === 1) {
      this.prev = true;
    } else if (this.currentStep === this.steps.length) {
      this.next = true;
      this.final = true;
    } else {
      this.next = false;
      this.prev = false;
    }

  }

}
