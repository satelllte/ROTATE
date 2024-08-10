import {
  type ROTATE_EventHandlersEventMap,
  type ROTATE_Event,
} from './ROTATE_Event';
import {ROTATE_EventMap} from './ROTATE_EventMap';

// TODO: extend type definition of "listener" if needed
type ListenerCallbackFn = () => void;

export class ROTATE_EventTarget {
  public listeners: ROTATE_EventMap; // TODO: mark as readonly, or private

  constructor() {
    this.listeners = new ROTATE_EventMap();
  }

  public addEventListener<EventType extends keyof ROTATE_EventHandlersEventMap>(
    type: EventType,
    listener: (event: ROTATE_EventHandlersEventMap[EventType]) => void,
  ): void {
    // TODO: re-implement properly
    if (!this.listeners.h.hasOwnProperty(type)) {
      const callbacks: ListenerCallbackFn[] = [];
      this.listeners.h[type] = callbacks;
    }
    // @ts-expect-error Object is of type 'unknown'.ts(2571)
    this.listeners.h[type].push(listener);
  }

  public removeEventListener<
    EventType extends keyof ROTATE_EventHandlersEventMap,
  >(
    type: EventType,
    listener: (event: ROTATE_EventHandlersEventMap[EventType]) => void,
  ): void {
    // TODO: re-implement properly
    if (this.listeners.h.hasOwnProperty(type)) {
      // @ts-expect-error Type 'unknown' is not assignable to type 'ListenerCallbackFn[]'.ts(2322)
      const callbacks: ListenerCallbackFn[] = this.listeners.h[type];
      const index = callbacks.indexOf(listener);
      0 > index || callbacks.splice(index, 1);
    }
  }

  public triggerEvent(event: ROTATE_Event): void {
    // TODO: re-implement properly
    if (this.listeners.h.hasOwnProperty(event.type)) {
      var i = 0;
      var eventType = event.type;
      // @ts-expect-error 'callbacks' is of type 'unknown'.ts(18046)
      for (var callbacks = this.listeners.h[eventType]; i < callbacks.length; )
        // @ts-expect-error Type 'String' has no call signatures.ts(2349)
        (eventType = callbacks[i]), ++i, eventType(event);
    }
  }
}
