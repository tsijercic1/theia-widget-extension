import { injectable, inject } from 'inversify';
import { MenuModelRegistry } from '@theia/core';
import { WidgyWidget } from './widgy-widget';
import {AbstractViewContribution, FrontendApplication} from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import {FrontendApplicationStateService} from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from '@theia/workspace/lib/browser';

export const WidgyCommand: Command = { id: 'widgy:command' };

@injectable()
export class WidgyContribution extends AbstractViewContribution<WidgyWidget> {

    @inject(FrontendApplicationStateService)
    protected readonly stateService: FrontendApplicationStateService;

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService;

    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     * 
     * We can pass `defaultWidgetOptions` which define widget properties such as 
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     * 
     */
    constructor() {
        super({
            widgetId: WidgyWidget.ID,
            widgetName: WidgyWidget.LABEL,
            defaultWidgetOptions: { area: 'top' },
            toggleCommandId: WidgyCommand.id
        });
    }

    /**
     * Example command registration to open the widget from the menu, and quick-open.
     * For a simpler use case, it is possible to simply call:
     ```ts
        super.registerCommands(commands)
     ```
     *
     * For more flexibility, we can pass `OpenViewArguments` which define 
     * options on how to handle opening the widget:
     * 
     ```ts
        toggle?: boolean
        activate?: boolean;
        reveal?: boolean;
     ```
     *
     * @param commands
     */
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(WidgyCommand, {
            execute: () => super.openView({ activate: true, reveal: true, toggle: true })
        });
    }

    /**
     * Example menu registration to contribute a menu item used to open the widget.
     * Default location when extending the `AbstractViewContribution` is the `View` main-menu item.
     * 
     * We can however define new menu path locations in the following way:
     ```ts
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: 'id',
            label: 'label'
        });
     ```
     * 
     * @param menus
     */
    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }

    async onStart(app: FrontendApplication): Promise<void> {
        if (!this.workspaceService.opened) {
            this.stateService.reachedState('ready').then(
                () => this.openView({ activate: true, reveal: true, toggle: true })
            );
        }
        app.shell.activateWidget(WidgyWidget.ID);
    }


}
