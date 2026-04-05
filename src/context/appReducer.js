/**
 * Application reducer — handles all global state mutations.
 * Pattern: Redux-like actions with useReducer.
 */
export const initialState = {
  transactions: [],
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    dateRange: null,       // { from, to } or null
    amountRange: null,     // { min, max } or null
    categories: [],        // multi-select (empty = all)
  },
  sortConfig: {
    key: 'date',
    direction: 'desc',
  },
  groupBy: 'none',         // 'none' | 'day' | 'month' | 'category'
  role: 'viewer',           // 'viewer' | 'admin'
  activeModal: null,        // null | 'add' | 'edit'
  selectedTransaction: null,
  isLoading: false,
  error: null,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null };

    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'LOAD_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
        error: null,
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: { ...initialState.filters },
      };

    case 'SET_SORT':
      return {
        ...state,
        sortConfig: action.payload,
      };

    case 'SET_GROUP_BY':
      return {
        ...state,
        groupBy: action.payload,
      };

    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'OPEN_MODAL':
      return {
        ...state,
        activeModal: action.payload.modal,
        selectedTransaction: action.payload.transaction ?? null,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        activeModal: null,
        selectedTransaction: null,
      };

    default:
      return state;
  }
};
