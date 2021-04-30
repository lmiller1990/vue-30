import { reactive } from 'vue';

type Method = (...args: any[]) => any;

type StoreWithState<S extends StateTree> = {
  state: S
}

type StoreWithActions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

type Store<
  S extends StateTree,
  A extends Record<string, Method>
> = StoreWithState<S> & S & StoreWithActions<A>;

export type StateTree = Record<string | number | symbol, any>;
function defineStore<
  S extends StateTree,
  A extends Record<string, Method>
>(options: {
  state: S,
  actions: A & ThisType<A & StoreWithState<S>>
}) {
  const initialStore = {
    state: options.state
  }

  return function useStore(): Store<S, A> {
    const wrappedActions: StoreWithActions<A> = {} as StoreWithActions<A>
    const actions = (options.actions || {}) as A

    for (const actionName in actions) {
      wrappedActions[actionName] = function(...args: any[]) {
        return actions[actionName].apply(store, args)
      } as StoreWithActions<A>[typeof actionName]
    }

    const store: Store<S, A> = reactive({
      ...initialStore,
      ...wrappedActions
    }) as Store<S, A>

    return store
  }
}

export const useMainStore = defineStore({
  state: {
    counter: 0,
  },
  actions: {
    inc(val: number = 1) {
      this.state.counter += val
    },
  },
});


const main = useMainStore();
