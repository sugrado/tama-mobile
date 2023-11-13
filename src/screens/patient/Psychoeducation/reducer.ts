interface IState {
  messages: any[];
  step: number;
  isTyping: boolean;
}

export enum ActionKind {
  SEND_MESSAGE = 'SEND_MESSAGE',
  SET_IS_TYPING = 'SET_IS_TYPING',
}

interface StateAction {
  type: ActionKind;
  payload?: any;
}

export function reducer(state: IState, action: StateAction) {
  switch (action.type) {
    case ActionKind.SEND_MESSAGE: {
      return {
        ...state,
        step: state.step + 1,
        messages: action.payload,
      };
    }
    case ActionKind.SET_IS_TYPING: {
      return {
        ...state,
        isTyping: action.payload,
      };
    }
  }
}
