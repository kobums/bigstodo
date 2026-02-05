export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface SigninRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  name: string;
}

export interface BoardListItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export interface BoardDetail {
  id: number;
  title: string;
  content: string;
  boardCategory: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface BoardRequest {
  title: string;
  content: string;
  category: string;
}

export type BoardCategory = Record<string, string>;

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { unsorted: boolean; sorted: boolean; empty: boolean };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: { unsorted: boolean; sorted: boolean; empty: boolean };
  first: boolean;
  empty: boolean;
}
