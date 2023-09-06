import "dotenv/config";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";

vi.stubEnv("JWT_KEY", "fake_token");

import { AuthenticationController } from "./AuthenticationController";
import { AuthenticationUseCase } from "../../shared/middleware/AuthenticationUseCase";
import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { User } from "../../entities/User";
import { Request, Response } from "express";

const mReq = { body: {  email: "mockedemail", password: "mockedpass" } } as unknown as Request;
const mRes = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;


const userRepository = new UsersRepository(); 
const authenticationUseCase = new AuthenticationUseCase()
const authController = new AuthenticationController(authenticationUseCase, userRepository);

const authenticationUseCaseMock = vi.spyOn(
  AuthenticationUseCase.prototype,
  "sign"
);

const userRepoMock = vi.spyOn(
  UsersRepository.prototype, 
  "findByEmailAndPassword"
)


vi.mock("../../../../shared-lambda/influxdb/queries");

const token = "fake_token"

afterEach(() => {
  vi.useFakeTimers();
});

beforeEach(() => {
  vi.clearAllMocks();

  authenticationUseCaseMock.mockImplementation(() => {
    return token;
  });
  userRepoMock.mockImplementation((email: string, password: string) => {
    return Promise.resolve({
      email: "test@test123.com"
    } as unknown as User);
  });
});

describe("Authenticate", () => {
  it("should authenticate with success when found a user", async () => {
    await authController.handle(mReq, mRes);
    expect(authenticationUseCaseMock).toBeCalled();
    expect(userRepoMock).toBeCalled();
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      accessToken: "fake_token"
    })
  });

  it("should return error if not have env variable set", async () => {
    authenticationUseCaseMock.mockImplementation(() => {
      return "JWT_KEY_UNDEFINED";
    });
    await authController.handle(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.json).toBeCalledWith({
      error: "We found an error generating your access token.",
    })
  });

  it("should return error if not found user", async () => {
    userRepoMock.mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    await authController.handle(mReq, mRes);
    expect(mRes.status).toBeCalledWith(403);
    expect(mRes.json).toBeCalledWith({
      error: "User not found.",
    })
  });

});
