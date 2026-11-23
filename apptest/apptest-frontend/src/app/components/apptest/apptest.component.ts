import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationPresenterAPI, ApplicationPresenter, RobotSettings, ProgramCodeService, VariableScope, VariableService, ProgramBehaviorAPI } from '@universal-robots/contribution-api';
import { ApptestNode } from './apptest.node';
import { makeVariable } from './apptest.behavior.worker';

interface PositionVariable {
        name: string;
        data: number[];
}

@Component({
    templateUrl: './apptest.component.html',
    styleUrls: ['./apptest.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ApptestComponent implements ApplicationPresenter, OnChanges {
    // applicationAPI is optional
    @Input() applicationAPI: ApplicationPresenterAPI;
    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // applicationNode is required
    @Input() applicationNode: ApptestNode;


    private positions: PositionVariable[] = [{name: 'TEST1', data: [100, 150, 200, 250, 300, 350]}, {name: 'TEST2', data: [100, 125, 150, 175, 200, 225]}, {name: 'TEST3', data: [100, 110, 120, 130, 140, 150]}]
    private variableNames = this.updateVariableList();
    private selectedPositionData = ['-', '-', '-', '-', '-', '-'];

    private debugMode: boolean = true;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }

    updateVariableList() {
        var names: string[] = [];
        for (var i in this.positions){
            names.push(this.positions[i].name);
        }
        return names;
    }

    
    getSelectedDataValue(positions: number[], index: number){
        return positions[index].toString();
    }

    updatePositionData(positionName: string){
        if (this.debugMode){ console.log("Updating position data");}
        var data: number[] = [0,0,0,0,0,0];
        for (var i in this.positions){
            if (this.debugMode){ console.log("Testing " + this.positions[i].name + " = " + positionName);}
            if (this.positions[i].name == positionName){
                data = this.positions[i].data;
                return data;
            }
        }
        return data;
    }

    selectNewVariable($event: any){
        var data = this.updatePositionData($event.toString());

        for (var i: number = 0; i < this.selectedPositionData.length; i++){
            if (this.debugMode){console.log("Setting" + this.selectedPositionData[i] + " to " + data[i]);}
            this.selectedPositionData[i] = this.getSelectedDataValue(data, i);
        }
        
        var ret = makeVariable();
        this.saveNode()
    }

    // call saveNode to save node parameters
    saveNode() {
        this.cd.detectChanges();
        this.applicationAPI.applicationNodeService.updateNode(this.applicationNode);
    }
}
