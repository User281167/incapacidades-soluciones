import { vi } from "vitest";

export const mockAxios = {
  get: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
  put: vi.fn(),
};

const mockAxiosInstance = {
  default: {
    create: vi.fn(() => ({
      get: mockAxios.get,
      post: mockAxios.post,
      delete: mockAxios.delete,
      put: mockAxios.put,
    })),
  },
};

export default mockAxiosInstance;
