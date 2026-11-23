import {ChangeDetectionStrategy, ChangeDetectorRef, Component, input, InputSignal, OnChanges, SimpleChanges} from '@angular/core';
import {
  RobotSettings,
  OperatorScreen,
  OperatorScreenPresenter,
  OperatorScreenPresenterAPI
} from '@universal-robots/contribution-api';


@Component({
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class Test1Component implements OperatorScreenPresenter {


}
