import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import {CommandService, MessageService} from '@theia/core';

@injectable()
export class WidgyWidget extends ReactWidget {

    static readonly ID = 'widgy:widget';
    static readonly LABEL = 'Widgy Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @inject(CommandService)
    protected readonly commandService!: CommandService;

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
            <button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
            <span className='pipe'>|</span>
            <button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: Widgy Widget Successfully Created!');
        // this.commandService.executeCommand('echo "hiiiii" ');
    }

}
