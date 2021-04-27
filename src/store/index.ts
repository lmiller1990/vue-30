import { reactive, ref, Ref } from '@vue/reactivity'

export type StateTree = Record<string | number | symbol, any>

export type StoreWithActions<A> = {
  [k in keyof A]: A[k] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
}

export interface Pinia {
  state: Ref<Record<string, StateTree>>
}

interface StoreWithState<Id extends string, S extends StateTree> {
  $id: Id
  state: S
}

export type Store<Id extends string, S extends StateTree, A> = StoreWithState<
  Id,
  S
> &
  S &
  StoreWithActions<A>

let activePinia: Pinia

function initStore<Id extends string, S extends StateTree>(
  $id: Id,
  buildState: () => S = () => ({} as S),
  initialState?: S | undefined
): [StoreWithState<Id, S>, { get: () => S; set: (newValue: S) => void }] {
  const pinia = activePinia
  pinia.state.value[$id] = initialState || buildState()

  const storeWithState: StoreWithState<Id, S> = {
    $id,
  } as StoreWithState<Id, S>

  return [
    storeWithState,
    {
      get: () => pinia.state.value[$id] as S,
      set: (newState: S) => {
        pinia.state.value[$id] = newState
      },
    },
  ]
}

type Method = (...args: any[]) => any

export interface StateDescriptor<S extends StateTree> {
  get(): S
  set(newValue: S): void
}

function buildStoreToUse<
  Id extends string,
  S extends StateTree,
  A extends Record<string, Method>
>(
  partialStore: StoreWithState<Id, S>,
  descriptor: StateDescriptor<S>,
  $id: Id,
  actions: A = {} as A
) {
  const pinia = activePinia

  const wrappedActions: StoreWithActions<A> = {} as StoreWithActions<A>
  for (const actionName in actions) {
    wrappedActions[actionName] = function () {
      return actions[actionName].apply(store, (arguments as unknown) as any[])
    } as StoreWithActions<A>[typeof actionName]
  }

  const store: Store<Id, S, A> = reactive({
    ...partialStore,
    ...wrappedActions,
  }) as Store<Id, S, A>

  Object.defineProperty(store, 'state', descriptor)

  return store
}

type StoreAndDescription<Id extends string, S extends StateTree> = [
  StoreWithState<Id, S>,
  StateDescriptor<S>
]

function defineStore<Id extends string, S extends StateTree, A>(options: {
  id: Id
  state?: () => S
  actions?: A & ThisType<A & S & StoreWithState<Id, S>>
}) {
  const { id, state, actions } = options

  const pinia: Pinia = {
    state: ref({}),
  }

  activePinia = pinia

  return function useStore(): Store<Id, S, A> {
    const storeAndDescriptor: StoreAndDescription<Id, S> = initStore(
      id,
      state,
      pinia.state.value[id]
    )
    const store = buildStoreToUse(
      storeAndDescriptor[0],
      storeAndDescriptor[1],
      id,
      actions as Record<string, Method> | undefined
    )

    return store
  }
}

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    counter: 0,
  }),
  actions: {
    inc() {
      this.state.counter += 1
    },
  },
})
