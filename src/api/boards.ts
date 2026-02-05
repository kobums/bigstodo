import client from './client';
import type { BoardDetail, BoardRequest, BoardCategory, BoardListItem, PageResponse } from '../types';

export async function getBoards(page: number, size: number): Promise<PageResponse<BoardListItem>> {
  const res = await client.get<PageResponse<BoardListItem>>('/boards', { params: { page, size } });
  return res.data;
}

export async function getBoard(id: number): Promise<BoardDetail> {
  const res = await client.get<BoardDetail>(`/boards/${id}`);
  return res.data;
}

export async function createBoard(data: BoardRequest, file?: File): Promise<{ id: number }> {
  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (file) formData.append('file', file);

  const res = await client.post<{ id: number }>('/boards', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function updateBoard(id: number, data: BoardRequest, file?: File): Promise<void> {
  const formData = new FormData();
  formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (file) formData.append('file', file);

  await client.patch(`/boards/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function deleteBoard(id: number): Promise<void> {
  await client.delete(`/boards/${id}`);
}

export async function getCategories(): Promise<BoardCategory> {
  const res = await client.get<BoardCategory>('/boards/categories');
  return res.data;
}
