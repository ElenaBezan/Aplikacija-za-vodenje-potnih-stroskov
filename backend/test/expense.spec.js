// tests/expense.test.js
const Expense = require("../models/expense");

jest.mock("../models/expense", () => ({
  add: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getByEmails: jest.fn(),
  getByUserEmail: jest.fn(),
  getByMonth: jest.fn(),
}));

describe("Expense Model Tests", () => {
  test("add - successfully adds an expense", async () => {
    const mockExpense = {
      naziv: "Test Strošek",
      datum_odhoda: "2024-10-27",
      datum_prihoda: "2024-10-28",
      kilometrina: 100,
      lokacija: "Ljubljana",
      opis: "Test opis",
      oseba: "test@example.com",
    };

    const response = { message: "Uspešno dodan potni strošek", strosek: mockExpense };
    Expense.add.mockResolvedValue(response);

    const result = await Expense.add(...Object.values(mockExpense));
    expect(Expense.add).toHaveBeenCalled();
    expect(result).toEqual(response);
  });

  test("getAll - fetch expenses with limit and offset", async () => {
    const mockExpenses = [{ id: "1", naziv: "Expense1" }, { id: "2", naziv: "Expense2" }];
    Expense.getAll.mockResolvedValue(mockExpenses);

    const result = await Expense.getAll(2, 0);
    expect(Expense.getAll).toHaveBeenCalledWith(2, 0);
    expect(result).toEqual(mockExpenses);
  });

  test("getById - retrieves expense by ID", async () => {
    const mockExpense = { id: "123", naziv: "Test Strošek" };
    Expense.getById.mockResolvedValue(mockExpense);

    const result = await Expense.getById("123");
    expect(Expense.getById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockExpense);
  });

  test("put - updates an expense", async () => {
    const updatedData = { naziv: "Updated Strošek" };
    Expense.put.mockResolvedValue({ message: "Potni strošek je uspešno posodobljen" });

    const result = await Expense.put("123", updatedData);
    expect(Expense.put).toHaveBeenCalledWith("123", updatedData);
    expect(result).toEqual({ message: "Potni strošek je uspešno posodobljen" });
  });

  test("delete - deletes an expense", async () => {
    Expense.delete.mockResolvedValue({ message: "Strosek je bil izbrisan" });

    const result = await Expense.delete("123");
    expect(Expense.delete).toHaveBeenCalledWith("123");
    expect(result).toEqual({ message: "Strosek je bil izbrisan" });
  });

  test("getByEmails - retrieves expenses by emails with pagination", async () => {
    const mockResponse = { stroski: [], totalItems: 0 };
    Expense.getByEmails.mockResolvedValue(mockResponse);

    const result = await Expense.getByEmails(["test@example.com"], 10, 1);
    expect(Expense.getByEmails).toHaveBeenCalledWith(["test@example.com"], 10, 1);
    expect(result).toEqual(mockResponse);
  });

  test("getByUserEmail - fetch expenses by user email", async () => {
    const mockExpenses = [{ id: "1", naziv: "Test Strošek" }];
    Expense.getByUserEmail.mockResolvedValue(mockExpenses);

    const result = await Expense.getByUserEmail("test@example.com");
    expect(Expense.getByUserEmail).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual(mockExpenses);
  });

  test("getByMonth - retrieves expenses by month", async () => {
    const mockExpenses = [{ id: "1", naziv: "October Strošek" }];
    Expense.getByMonth.mockResolvedValue(mockExpenses);

    const result = await Expense.getByMonth(2024, 10, 10, 0);
    expect(Expense.getByMonth).toHaveBeenCalledWith(2024, 10, 10, 0);
    expect(result).toEqual(mockExpenses);
  });

  test("add - fails with missing parameters", async () => {
    Expense.add.mockRejectedValue(new Error("Napaka pri dodajanju potnega stroška v bazo"));

    await expect(Expense.add(null, null, null)).rejects.toThrow(
      "Napaka pri dodajanju potnega stroška v bazo"
    );
  });

  test("delete - fails for non-existent expense", async () => {
    Expense.delete.mockRejectedValue(new Error("Strosek ne obstaja"));

    await expect(Expense.delete("nonexistent")).rejects.toThrow("Strosek ne obstaja");
  });
});
