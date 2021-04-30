import { reactive } from "@vue/reactivity";

export type StateTree = Record<string | number | symbol, any>;

export type StoreWithActions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never;
};

interface StoreWithState<S extends StateTree> {
  state: S;
}

interface StoreAPI {
  state: StateTree;
}

type Method = (...args: any[]) => any;

type Store<
  S extends StateTree,
  A extends Record<string, Method>
> = StoreWithState<S> & S & StoreWithActions<A>;

function defineStore<
  S extends StateTree,
  A extends Record<string, Method>
>(options: { state: S; actions?: A & ThisType<A & StoreWithState<S>> }) {
  const { actions = {} as A } = options;

  const initialStore: StoreAPI = {
    state: options.state
  };

  return function useStore(): Store<S, A> {
    const descriptor = {
      get: () => initialStore.state as S,
    };

    const wrappedActions: StoreWithActions<A> = {} as StoreWithActions<A>;
    for (const actionName in actions) {
      wrappedActions[actionName] = function (...args: any[]) {
        return actions[actionName].apply(
          store,
          args
        );
      } as StoreWithActions<A>[typeof actionName];
    }

    const store: Store<S, A> = reactive({
      ...initialStore,
      ...wrappedActions,
    }) as Store<S, A>;

    Object.defineProperty(store, "state", descriptor);

    return store;
  };
}

export const useMainStore = defineStore({
  state: {
    counter: 0,
  },
  actions: {
    inc(a: number, b: number) {
      this.state.counter += (a + b)
    },
  },
});

const main = useMainStore();

export const useOtherStore = defineStore({
  state: {
    name: "foo",
  },
  actions: {
    changeName() {
      this.state.name = `Count is ${main.state.counter}`;
    },
  },
});

