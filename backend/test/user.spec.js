// tests/user.test.js
const User = require("../models/user");

jest.mock("../models/user", () => ({
  add: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getByEmail: jest.fn(),
  getByFullName: jest.fn(),
}));

describe("User Model Tests", () => {
  test("add - successfully adds a user", async () => {
    const mockUser = {
      ime: "Test",
      priimek: "User",
      email: "test@example.com",
      geslo: "password",
      tip: "delavec",
    };
    const response = { message: "Uspešna registracija", uporabnik: mockUser };
    User.add.mockResolvedValue(response);

    const result = await User.add(...Object.values(mockUser));
    expect(User.add).toHaveBeenCalled();
    expect(result).toEqual(response);
  });

  test("getAll - fetch all users", async () => {
    const mockUsers = [{ email: "test@example.com", ime: "Test" }];
    User.getAll.mockResolvedValue(mockUsers);

    const result = await User.getAll();
    expect(User.getAll).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  test("getById - retrieves user by ID", async () => {
    const mockUser = { email: "test@example.com", ime: "Test" };
    User.getById.mockResolvedValue(mockUser);

    const result = await User.getById("test@example.com");
    expect(User.getById).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual(mockUser);
  });

  test("delete - deletes a user", async () => {
    User.delete.mockResolvedValue({ message: "Uporabnik je bil izbrisan" });

    const result = await User.delete("test@example.com");
    expect(User.delete).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual({ message: "Uporabnik je bil izbrisan" });
  });

  test("getByFullName - retrieves user by full name", async () => {
    const mockUsers = [{ email: "test@example.com", ime: "Test" }];
    User.getByFullName.mockResolvedValue(mockUsers);

    const result = await User.getByFullName("Test", "User");
    expect(User.getByFullName).toHaveBeenCalledWith("Test", "User");
    expect(result).toEqual(mockUsers);
  });

  test("getByEmail - retrieves user by email", async () => {
    const mockUser = { email: "test@example.com", ime: "Test" };
    User.getByEmail.mockResolvedValue(mockUser);
  
    const result = await User.getByEmail("test@example.com");
    expect(User.getByEmail).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual(mockUser);
  });
  
  test("put - updates a user's information", async () => {
    const updatedUser = {
      email: "test@example.com",
      ime: "Updated",
      priimek: "User",
      tip: "admin",
    };
    User.put.mockResolvedValue({ message: "Uporabnik je bil posodobljen", updatedUser });
  
    const result = await User.put("test@example.com", updatedUser);
    expect(User.put).toHaveBeenCalledWith("test@example.com", updatedUser);
    expect(result).toEqual({ message: "Uporabnik je bil posodobljen", updatedUser });
  });
  
  test("add - throws an error when adding a user fails", async () => {
    const mockUser = {
      ime: "Test",
      priimek: "User",
      email: "test@example.com",
      geslo: "password",
      tip: "delavec",
    };
    const error = new Error("Napaka pri registraciji");
    User.add.mockRejectedValue(error);
  
    await expect(User.add(...Object.values(mockUser))).rejects.toThrow("Napaka pri registraciji");
    expect(User.add).toHaveBeenCalledWith(...Object.values(mockUser));
  });
  
});
