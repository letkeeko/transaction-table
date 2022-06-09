import React from "react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
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

    const completeText = within(statusCell).getByText("complete");

    expect(completeText).toBeInTheDocument();
  });

  it("should show transaction status when it is exported", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "exported"
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 0);

    const exportedText = within(statusCell).getByText("exported");

    expect(exportedText).toBeInTheDocument();
  });

  it("should show transaction status when it is incomplete", () => {
    const incompleteTransaction = transactionsData.find(
      ({ status }) => status === "incomplete"
    );

    renderApp({ transactions: [incompleteTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 0);

    const incompleteText = within(statusCell).getByText("incomplete");

    expect(incompleteText).toBeInTheDocument();
  });
});

describe("date", () => {
  it("should show a formatted date", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 1);

    const formattedDate = within(statusCell).getByText(
      /[0-9]{2}\s[A-Z]{3}\s[0-9]{4}/i
    );

    expect(formattedDate).toBeInTheDocument();
  });
});

describe("merchant name", () => {
  it("should show existing merchant name", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    const { name } = merchantsData.find(
      ({ id }) => id === completeTransaction.merchant
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 2);

    const merchantName = within(statusCell).getByText(name);

    expect(merchantName).toBeInTheDocument();
  });
});

describe("team member", () => {
  it("should show team member name", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 3);

    const teamMemberName = within(statusCell).getByText(
      completeTransaction.team_member
    );

    expect(teamMemberName).toBeInTheDocument();
  });
});

describe("category", () => {
  it("should show existing category", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    const { name } = categoriesData.find(
      ({ id }) => id === completeTransaction.category
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 4);

    const categoryName = within(statusCell).getByText(name);

    expect(categoryName).toBeInTheDocument();
  });
});

describe("amount", () => {
  it("should show amount", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 5);

    const amountWithDollarSign = within(statusCell).getByText(
      "$" + completeTransaction.amount
    );

    expect(amountWithDollarSign).toBeInTheDocument();
  });
});

describe("gst", () => {
  it("should show gst", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 6);

    const gstWithDollarSign = within(statusCell).getByText(
      "$" + completeTransaction.gst
    );

    expect(gstWithDollarSign).toBeInTheDocument();
  });
});

describe("budget", () => {
  it("should show budget", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 7);

    const budgetName = within(statusCell).getByText(completeTransaction.budget);

    expect(budgetName).toBeInTheDocument();
  });
});

describe("receipt", () => {
  it("should be checked when it is true", () => {
    const completeTransaction = transactionsData.find(
      ({ receipt }) => receipt === true
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 8);

    const checkbox = within(statusCell).getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("should be unchecked when it is false", () => {
    const completeTransaction = transactionsData.find(
      ({ receipt }) => receipt === false
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 8);

    const checkbox = within(statusCell).getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-ischecked", "false");
  });
});

describe("billable", () => {
  it("should be checked when it is true", () => {
    const completeTransaction = transactionsData.find(
      ({ billable }) => billable === true
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 9);

    const checkbox = within(statusCell).getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("should be unchecked when it is false", () => {
    const completeTransaction = transactionsData.find(
      ({ billable }) => billable === false
    );

    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 1, 9);

    const checkbox = within(statusCell).getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-ischecked", "false");
  });
});
