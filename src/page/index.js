import React from "react";
import styled, { css } from "styled-components";
import { COLOR, FONT } from "../components/variables";
import Table from "../components/table/table";
import Thead from "../components/table/thead";
import Tbody from "../components/table/tbody";
import Tr from "../components/table/tr";
import Th from "../components/table/th";
import Td from "../components/table/td";
import Select from "../components/select";
import Input from "../components/input";
import Title from "../components/title";
import Symbol from "../components/symbol";
import Checkbox from "../components/checkbox";
import Button from "../components/button";

import formatDate from "../utils/format-date";
import formatTime from "../utils/format-time";
import getNameValue from "../utils/get-name-value";
import getStatusIcon from "../utils/get-status-icon";

// icon for input search
const magnifyingGlass = css`
  &::before {
    content: "";
    background-color: ${COLOR.white};
    border: 2px solid ${COLOR.black};
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    position: absolute;
    left: 11px;
    top: 11px;
    pointer-events: none;
  }

  &::after {
    content: "";
    background-color: ${COLOR.black};
    display: block;
    width: 2px;
    height: 6px;
    position: absolute;
    left: 22px;
    top: 22px;
    transform: rotate(-40deg);
    pointer-events: none;
  }
`;

// main style wrapper
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

    .input-wrap {
      position: relative;
      ${magnifyingGlass};
    }
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

    // used for input search so the height doesn't shift
    &--absolute {
      position: absolute;
      left: 0;
      bottom: -20px;
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
  const headers = [
    { name: "Status" },
    { name: "Date" },
    { name: "Merchant Name" },
    { name: "Team Member" },
    {
      name: "Category",
      options: allCategories || [],
    },
    { name: "Amount" },
    { name: "GST" },
    { name: "Budget" },
    { name: "Receipt" },
    { name: "Billable" },
  ];

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

        <div className="input-wrap">
          <Input
            type="text"
            placeholder="Search records"
            value={searchTerm}
            feedback="Minimum"
            onChange={handleInputChange}
          />
          {!!feedback && (
            <p className="feedback feedback--absolute">{feedback}</p>
          )}
        </div>
      </div>

      {!!transactions && (
        <Table>
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th key={header.name}>
                  {!header.options && header.name}

                  {!!header.options && (
                    <Select
                      label={header.name}
                      options={header.options}
                      value={selectedCategory}
                      onChange={handleFilterByCategory}
                    />
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {transactions.map((transaction) => {
              const {
                id,
                status,
                date,
                merchant,
                team_member,
                category,
                amount,
                gst,
                budget,
                receipt,
                billable,
              } = transaction;

              return (
                <Tr key={id}>
                  <Td title={status} w="95px" align="center">
                    <Symbol
                      icon={getStatusIcon(status)}
                      bgColor={COLOR.status[status]}
                      color={COLOR.white}
                    />
                    <span className="hidden">{status}</span>
                  </Td>

                  <Td title={formatTime(date)}>{formatDate(date)}</Td>

                  <Td title={getNameValue(allMerchants, merchant)}>
                    <Symbol
                      icon={getNameValue(allMerchants, merchant)?.charAt(0)}
                      mr="8px"
                    />
                    {getNameValue(allMerchants, merchant)}
                  </Td>

                  <Td title={team_member}>{team_member}</Td>

                  <Td title={getNameValue(allCategories, category)}>
                    {getNameValue(allCategories, category)}
                  </Td>

                  <Td title={`$${amount} AUD`} align="center" w="110px">
                    {amount}
                  </Td>

                  <Td title={`$${gst} AUD`} align="center" w="110px">
                    {gst}
                  </Td>

                  <Td title={budget}>{budget}</Td>

                  <Td align="center" w="95px">
                    <Checkbox isChecked={receipt} />
                  </Td>

                  <Td align="center" w="95px">
                    <Checkbox
                      id={id}
                      isChecked={billable}
                      onChange={handleBillableCheck}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

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
