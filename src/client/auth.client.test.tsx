import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { checkAccountExists, loginUser, signIn } from "./auth.client";
import mockUser from "../mocks/auth/users.json";
import mockVerify from "../mocks/auth/verify-true.json";

describe("AuthClient tests", () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });
  afterEach(() => {
    axiosMock.reset();
  });

  it("should authenticate user", async () => {
    // Given
    const email = "test@mail.com";
    const password = "password";
    axiosMock.onPost("http://localhost:7878/auth").reply(200, mockUser);

    // When
    const response = await loginUser(email, password);

    // Then
    expect(response).toEqual({
      id: 1,
      pseudo: "Jane",
      email: "test@mail.com",
    });
  });

  it("should fail to authenticate user", async () => {
    // Given
    const email = "test@mail.com";
    const password = "password";
    axiosMock.onPost("http://localhost:7878/auth").reply(500);
    let response = {};

    // When
    try {
      response = await loginUser(email, password);
    } catch (e: any) {
      // Then
      expect(e.message).toBe("Request failed with status code 500");
      expect(response).toEqual({});
    }
  });

  it("should check if an account exists", async () => {
    // Given
    const email = "test@mail.com";
    axiosMock.onPost("http://localhost:7878/verify").reply(200, mockVerify);

    // When
    const response = await checkAccountExists(email);

    // Then
    expect(response).toBeTruthy();
  });

  it("should throw error when api response cannot be parsed", async () => {
    // Given
    const email = "test@mail.com";
    axiosMock.onPost("http://localhost:7878/verify").reply(200, {
      id: 2
    });
    let response = {};

    // When
    try {
      response = await checkAccountExists(email);
    } catch (e: any) {
      // Then
      expect(e.message).toBe("Could not parse api /verify response. ");
      expect(response).toEqual({});
    }
  });

  it("should fail to check account existence", async () => {
    // Given
    const email = "test@mail.com";
    axiosMock.onPost("http://localhost:7878/verify").reply(500);
    let response = {};

    // When
    try {
      response = await checkAccountExists(email);
    } catch (e: any) {
      // Then
      expect(e.message).toBe("Request failed with status code 500");
      expect(response).toEqual({});
    }
  });

  it("should sign in user ", async () => {
    // Given
    const pseudo = "Jane";
    const email = "test@mail.com";
    const password = "password";
    axiosMock.onPost("http://localhost:7878/sign-in").reply(200, mockUser);

    // When
    const response = await signIn(pseudo, email, password);

    // Then
    expect(response).toEqual({
      id: 1,
      pseudo: "Jane",
      email: "test@mail.com",
    });
  });

  it("should fail to sign in user ", async () => {
    // Given
    const pseudo = "Jane";
    const email = "test@mail.com";
    const password = "password";
    axiosMock.onPost("http://localhost:7878/sign-in").reply(500);
    let response = {};

    // When
    try {
      response = await signIn(pseudo, email, password);
    } catch (e: any) {
      // Then
      expect(e.message).toBe("Request failed with status code 500");
      expect(response).toEqual({});
    }
  });
});
