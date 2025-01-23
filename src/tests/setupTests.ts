import { vi } from "vitest";
import "@testing-library/jest-dom";
import mockAxiosInstance from "./mocks/axios-mock";

vi.mock("axios", () => mockAxiosInstance);
