import { Event, BasicEvent } from '@ali/ide-core-common';

export interface IContextKey<T> {
  set(value: T | undefined): void;
  reset(): void;
  get(): T | undefined;
}

export const IContextKeyService = Symbol('IContextKeyService');

export interface IContextKeyService {
  onDidChangeContext: Event<ContextKeyChangeEvent>;

  createKey<T>(key: string, defaultValue: T | undefined): IContextKey<T>;
  match(expression: string | monaco.contextkey.ContextKeyExpr | undefined, context?: HTMLElement | null): boolean;
  getKeysInWhen(when: string | monaco.contextkey.ContextKeyExpr | undefined): string[];
  getContextValue<T>(key: string): T | undefined;

  createScoped(target?: monaco.contextkey.IContextKeyServiceTarget | monaco.contextKeyService.ContextKeyService): IScopedContextKeyService;

  parse(when: string | undefined): monaco.contextkey.ContextKeyExpr | undefined;
  dispose(): void;
}

export interface IScopedContextKeyService extends IContextKeyService {
  attachToDomNode(domNode: HTMLElement): void;
}

export interface IContextKeyChangeEventPayload {
  affectsSome(keys: IReadableSet<string>): boolean;
}

export interface IReadableSet<T> {
  has(value: T): boolean;
}

export class ContextKeyChangeEvent extends BasicEvent<IContextKeyChangeEventPayload> {}
