import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";
import { act } from "react-dom/test-utils";

describe("useLocalStorage hook tests", () => {
  let mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  let mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
  let mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set item in localStorage and update state', () => {
    // Given
    const { result } = renderHook(() => useLocalStorage());

    // When
    act(() => {
      result.current.setItem('testKey', 'testValue');
    });

    // Then
    expect(mockSetItem).toHaveBeenCalledWith('testKey', 'testValue');
    expect(result.current.value).toBe('testValue');
  });

  it('should get item from localStorage and update state', () => {
    const { result } = renderHook(() => useLocalStorage());

    // @ts-ignore
    global.localStorage.getItem.mockReturnValueOnce('testValue');

    act(() => {
      result.current.getItem('testKey');
    });

    expect(mockGetItem).toHaveBeenCalledWith('testKey');
    expect(result.current.value).toBe('testValue');
  });

  it('should remove item from localStorage and update state', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.removeItem('testKey');
    });

    expect(mockRemoveItem).toHaveBeenCalledWith('testKey');
    expect(result.current.value).toBeNull();
  });
});