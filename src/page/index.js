import React from "react";
import styled from "styled-components";
import { COLOR, FONT } from "../components/variables";
import SearchBar from "../components/search-bar/search-bar";
import Transactions from "../components/transactions/transactions";
import Title from "../components/title";
import Button from "../components/button";

import getNameValue from "../utils/get-name-value";

const PageContainer = styled.div`
  color: ${COLOR.black};
  font-family: ${FONT.main};
  max-width: max-content;
  padding: 48px 24px;
  margin: 0 auto;

  .flex-wrap {
    justify-content: ${({ isCategory }) =>
      isCategory ? "space-between" : "flex-end"};
    min-width: 1304px; // based on table's fixed width
    display: flex;
    align-items: flex-end;
    margin: 0 0 36px 0;
  }

  .feedback {
    font-size: 0.875rem;

    strong {
      font-weight: 700;
    }

    &--center {
      text-align: center;
      margin: 0 0 48px 0;
    }

    &--lg {
      font-size: 1.5rem;
    }
  }

  .hidden {
    display: none;
  }
`;

const Home = ({
  transactions,
  allMerchants,
  allCategories,
  selectedCategory,
  searchTerm,
  feedback,
  handleInputChange,
  handleFilterByCategory,
  handleBillableCheck,
  handleReset,
}) => {
  return (
    <PageContainer isCategory={!!selectedCategory}>
      <Title align="center" mb="20px">
        Transactions
      </Title>

      <div className="flex-wrap">
        {!!selectedCategory && (
          <p className="feedback">
            Selected category:{" "}
            <strong>{getNameValue(allCategories, selectedCategory)}</strong>
          </p>
        )}

        <SearchBar
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          feedback={feedback}
        />
      </div>

      <Transactions
        transactions={transactions}
        allMerchants={allMerchants}
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        handleFilterByCategory={handleFilterByCategory}
        handleBillableCheck={handleBillableCheck}
      />

      {!transactions && (
        <>
          <p className="feedback feedback--lg feedback--center">
            No records found{" "}
            <span role="img" aria-label="Sad record">
              😵‍💫
            </span>
          </p>
          <Button
            onClick={handleReset}
            title="Back to all records"
            align="center"
          >
            CLEAR FILTER
          </Button>
        </>
      )}
    </PageContainer>
  );
};

export default Home;
