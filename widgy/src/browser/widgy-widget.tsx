import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { CommandService, MessageService } from '@theia/core';
import { TaskService } from '@theia/task/lib/browser';


@injectable()
export class WidgyWidget extends ReactWidget {

    static readonly ID = 'widgy:widget';
    static readonly LABEL = 'Widgy Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @inject(CommandService)
    protected readonly commandService!: CommandService;

    @inject(TaskService)
    protected readonly taskService!: TaskService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = WidgyWidget.ID;
        this.title.label = WidgyWidget.LABEL;
        this.title.caption = WidgyWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    protected render(): React.ReactNode {
        return <div id='widget-container'>
            <button className='theia-button' title='Run main' onClick={_a => this.displayMessage()}>Run</button>
        </div>
    }

    protected displayMessage(): void {
        this.taskService.runTaskByLabel('Run');
    }

}
