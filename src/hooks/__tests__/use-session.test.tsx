import { renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSessionManagement } from "../use-session";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

// Mock dos hooks externos
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../use-toast", () => ({
  useToast: jest.fn(),
}));

describe("useSessionManagement", () => {
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();
  const mockSetSession = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it("should clear session and localStorage when clearSession is called", () => {
    const { result } = renderHook(() =>
      useSessionManagement(null, mockSetSession)
    );

    // Mock localStorage
    const mockClear = jest.spyOn(Storage.prototype, "clear");

    act(() => {
      result.current.clearSession();
    });

    expect(mockSetSession).toHaveBeenCalledWith(null);
    expect(mockClear).toHaveBeenCalled();
  });

  it("should handle session end with message", () => {
    const { result } = renderHook(() =>
      useSessionManagement(null, mockSetSession)
    );

    act(() => {
      result.current.handleSessionEnd("Test message");
    });

    expect(mockSetSession).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(mockToast).toHaveBeenCalledWith({
      title: "Sessão encerrada",
      description: "Test message",
    });
  });

  it("should check session validity and return false for expired session", async () => {
    const mockSession = {
      expires_at: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    } as Session;

    const { result } = renderHook(() =>
      useSessionManagement(mockSession, mockSetSession)
    );

    const isValid = await result.current.checkSessionValidity(mockSession);

    expect(isValid).toBe(false);
    expect(mockToast).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should show warning for session expiring soon", async () => {
    const mockSession = {
      expires_at: Math.floor(Date.now() / 1000) + 240, // 4 minutes from now
    } as Session;

    const { result } = renderHook(() =>
      useSessionManagement(mockSession, mockSetSession)
    );

    const isValid = await result.current.checkSessionValidity(mockSession);

    expect(isValid).toBe(true);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Atenção",
      description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
      duration: 10000,
    });
  });
});