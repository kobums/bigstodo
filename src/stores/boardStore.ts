import { create } from 'zustand';
import type { BoardListItem, BoardDetail, BoardCategory } from '../types';

interface BoardState {
  boards: BoardListItem[];
  currentBoard: BoardDetail | null;
  categories: BoardCategory;
  page: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  loading: boolean;
  setBoards: (boards: BoardListItem[], totalPages: number, totalElements: number, page: number) => void;
  setCurrentBoard: (board: BoardDetail | null) => void;
  setCategories: (categories: BoardCategory) => void;
  setPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  currentBoard: null,
  categories: {},
  page: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 10,
  loading: false,

  setBoards: (boards, totalPages, totalElements, page) =>
    set({ boards, totalPages, totalElements, page }),
  setCurrentBoard: (currentBoard) => set({ currentBoard }),
  setCategories: (categories) => set({ categories }),
  setPage: (page) => set({ page }),
  setLoading: (loading) => set({ loading }),
}));
