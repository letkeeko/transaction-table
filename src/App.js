import React, { useState, useEffect } from "react";
import HomePage from "./page/index";

import getNameValue from "./utils/get-name-value";
import isMatch from "./utils/is-match";
import isValidTerm from "./utils/is-valid-term";

const App = ({
  categories: allCategories,
  merchants: allMerchants,
  transactions: allTransactions,
}) => {
  // allTransations -> immutable
  // transactions -> mutable
  const [transactions, setTransactions] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleFilterByCategory = (e) => {
    // scenario: user selected from dropdown
    setSelectedCategory(e.target.value);

    // scenario: user dropdown selection is not empty
    if (isValidTerm(e.target.value)) {
      // scenario: user has type valid search input
      if (isValidTerm(searchTerm)) {
        const filteredBySearch = getFilteredBySearch(searchTerm);

        const filteredByCategory = getFilteredByCategory(
          e.target.value,
          filteredBySearch
        );

        // result is empty
        if (filteredByCategory.length === 0) {
          setTransactions(null);

          return;
        }

        // result is not empty
        setTransactions(filteredByCategory);

        return;
      }

      // scenario: user has type invalid search input
      if (!isValidTerm(searchTerm)) {
        const filteredTransactions = allTransactions.filter((transaction) => {
          return transaction.category === e.target.value;
        });

        // result is empty
        if (filteredTransactions.length === 0) {
          setTransactions(null);

          return;
        }

        // result is not empty
        setTransactions(filteredTransactions);

        return;
      }
    }

    // scenario: user has touched dropdown but selected empty
    if (e.target.value === "") {
      const filteredBySearch = getFilteredBySearch(searchTerm);
      setTransactions(filteredBySearch);

      return;
    }

    // // back to immutable list if none selected
    // setTransactions(allTransactions);
  };

  const handleSearch = () => {
    // resets feedback every search run
    // if (!!feedback) setFeedback(null);

    // scenario: user selection and search input both empty
    if (!isValidTerm(searchTerm) && !isValidTerm(selectedCategory)) {
      setTransactions(allTransactions);

      return;
    }

    // scenario: user has type search input but selected category is empty
    if (isValidTerm(searchTerm) && !isValidTerm(selectedCategory)) {
      const filteredBySearch = getFilteredBySearch(searchTerm);

      // result is empty
      if (filteredBySearch.length === 0) {
        setTransactions(null);

        return;
      }

      // result is not empty
      setTransactions(filteredBySearch);
      return;
    }

    // scenario: user has touched input but empty
    if (searchTerm === "") {
      const filteredByCategory = getFilteredByCategory(
        selectedCategory,
        allTransactions
      );

      setTransactions(filteredByCategory);

      return;
    }

    // scenario: user has type valid search input and selected category
    if (isValidTerm(searchTerm) && isValidTerm(selectedCategory)) {
      const filteredBySearch = getFilteredBySearch(searchTerm);
      const filteredByCategory = getFilteredByCategory(
        selectedCategory,
        filteredBySearch
      );

      // result is  empty
      if (filteredByCategory.length === 0) {
        setTransactions(null);

        return;
      }

      // result is not empty
      setTransactions(filteredByCategory);

      return;
    }
  };

  const handleBillableCheck = (e) => {
    // value from checkbox data-id
    const selectedId = e.target.dataset.id;

    if (!selectedId) {
      return;
    }

    // return index of selected transaction
    const current = transactions.findIndex(
      (transaction) => transaction.id === selectedId
    );

    // toggle its boolean value
    transactions[current].billable = !transactions[current].billable;

    setTransactions([...transactions]);
  };

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    setTransactions(allTransactions);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // only handle search if input is touched
    if (searchTerm !== null) {
      const timeoutId = setTimeout(() => {
        // run when user stop typing
        handleSearch();

        if (searchTerm !== "" && searchTerm.length < 3) {
          setFeedback("Minimum 3 characters");
        } else {
          setFeedback(null);
        }
      }, 650);

      // clear above function as user continues to type
      return () => clearTimeout(timeoutId);
    }

    // eslint-disable-next-line
  }, [searchTerm]);

  const getFilteredBySearch = (str, arr) => {
    const filteredBySearch = allTransactions.filter((transaction) => {
      const { merchant, category, team_member, budget, amount, gst } =
        transaction;

      return (
        isMatch(getNameValue(allMerchants, merchant), str) ||
        isMatch(getNameValue(allCategories, category), str) ||
        isMatch(team_member, searchTerm) ||
        isMatch(budget, str) ||
        isMatch(amount, str) ||
        isMatch(gst, str)
      );
    });

    return filteredBySearch;
  };

  const getFilteredByCategory = (str, arr) => {
    if (isValidTerm(str)) {
      const filteredByCategory = arr.filter((transaction) => {
        return transaction.category === str;
      });

      return filteredByCategory;
    }

    setTransactions(allTransactions);
  };

  // simply back to initial state
  const handleReset = () => {
    setTransactions(allTransactions);
    setSearchTerm(null);
    setSelectedCategory(null);
  };

  return (
    <HomePage
      transactions={transactions}
      allMerchants={allMerchants}
      allCategories={allCategories}
      selectedCategory={selectedCategory}
      searchTerm={searchTerm}
      feedback={feedback}
      handleInputChange={handleInputChange}
      handleFilterByCategory={handleFilterByCategory}
      handleBillableCheck={handleBillableCheck}
      handleReset={handleReset}
    />
  );
};

export default App;
