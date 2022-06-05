import React from "react";
import App from "./App";
import { render, within, screen } from "@testing-library/react";
import categoriesData from "./data/categories.json";
import merchantsData from "./data/merchants.json";
import transactionsData from "./data/transactions.json";

const renderApp = ({
  categories = categoriesData,
  merchants = merchantsData,
  transactions = transactionsData,
} = {}) =>
  render(
    <App
      categories={categories}
      merchants={merchants}
      transactions={transactions}
    />
  );

const getRows = (screen) => screen.getAllByRole("row");

const getStatusCell = (row, colNumber) =>
  within(row).getAllByRole("cell")[colNumber];

const getStatusCellInRow = (screen, rowNumber, colNumber) =>
  getStatusCell(getRows(screen)[rowNumber], colNumber);

it("should show title", () => {
  renderApp();

  screen.getByRole("heading", { name: "Transactions" });
});

describe("status", () => {
  it("should show transaction status when it is complete", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );
    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 0);
    within(statusCell).getByText("complete");
  });

  it("should show transaction status when it is exported", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "exported"
    );
    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 0);
    within(statusCell).getByText("exported");
  });

  it("should show transaction status when it is incomplete", () => {
    const incompleteTransaction = transactionsData.find(
      ({ status }) => status === "incomplete"
    );
    renderApp({ transactions: [incompleteTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 0);
    within(statusCell).getByText("incomplete");
  });
});

describe("date", () => {
  it("should show a formatted date", () => {
    renderApp();

    const statusCell = getStatusCellInRow(screen, 1, 1);

    within(statusCell).getByText(/[0-9]{2}\s[A-Z]{3}\s[0-9]{4}/i);
  });
});
