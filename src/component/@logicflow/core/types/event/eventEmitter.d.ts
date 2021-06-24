import { EventArgs } from '../type';
export interface EventType {
    readonly callback: Function;
    readonly once: boolean;
}
export declare type CallbackType = (...args: any[]) => void;
export { EventEmitter };
export default class EventEmitter {
    private _events;
    /**
       * 监听一个事件
       * @param evt
       * @param callback
       * @param once
       */
    on(evt: string, callback: CallbackType, once?: boolean): this;
    /**
       * 监听一个事件一次
       * @param evt
       * @param callback
       */
    once(evt: string, callback: CallbackType): this;
    /**
       * 触发一个事件
       * @param evt
       * @param args
       */
    emit(evt: string, eventArgs: EventArgs): void;
    /**
       * 取消监听一个事件，或者一个channel
       * @param evt
       * @param callback
       */
    off(evt?: string, callback?: CallbackType): this;
    getEvents(): Record<string, EventType[]>;
}
