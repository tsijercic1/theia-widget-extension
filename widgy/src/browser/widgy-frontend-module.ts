import { ContainerModule } from 'inversify';
import { WidgyWidget } from './widgy-widget';
import { WidgyContribution } from './widgy-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, WidgyContribution);
    bind(FrontendApplicationContribution).toService(WidgyContribution);
    bind(WidgyWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: WidgyWidget.ID,
        createWidget: () => ctx.container.get<WidgyWidget>(WidgyWidget)
    })).inSingletonScope();
});
