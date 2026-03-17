import mitt from 'mitt';
import { Pizza } from './types/pizza';

type Event = {
    'pizza-state-changed': Pizza;
}

export const eventBus = mitt();
