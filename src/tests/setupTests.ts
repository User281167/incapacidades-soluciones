import { vi } from "vitest";
import mockAxiosInstance from "./mocks/axios-mock";

vi.mock("axios", () => mockAxiosInstance);
