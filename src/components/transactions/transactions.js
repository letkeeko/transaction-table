import React from "react";
import styled from "styled-components";
import { COLOR } from "../../components/variables";
import Table from "../../components/table/table";
import Thead from "../../components/table/thead";
import Tbody from "../../components/table/tbody";
import Tr from "../../components/table/tr";
import Th from "../../components/table/th";
import Td from "../../components/table/td";
import Select from "../../components/select";
import Symbol from "../../components/symbol";
import Checkbox from "../../components/checkbox";

import formatDate from "../../utils/format-date";
import formatTime from "../../utils/format-time";
import getNameValue from "../../utils/get-name-value";
import getStatusIcon from "../../utils/get-status-icon";

const Wrapper = styled.div``;

const Transactions = ({
  transactions,
  allMerchants,
  allCategories,
  selectedCategory,
  handleFilterByCategory,
  handleBillableCheck,
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
    <Wrapper>
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
                    ${amount}
                  </Td>

                  <Td title={`$${gst} AUD`} align="center" w="110px">
                    ${gst}
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
    </Wrapper>
  );
};

export default Transactions;
