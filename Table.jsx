/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Empty, Pagination, Tooltip } from "antd";
import TableDummyData from "../../Services/Data/TableData";

const Table = ({ tableTitle, columns, data = TableDummyData, tooltipShow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const rows = Array.isArray(data) ? data : [];
  const totalItems = rows.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentRows = rows.slice(startIndex, endIndex);

  return (
    <div className="relative w-full rounded-xl">
      <div className="overflow-x-auto no-scrollbar rounded-xl w-full">
        <div className="h-[42vh] overflow-y-auto no-scrollbar">
          <table className="w-full border-collapse rounded-xl shadow-md whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-[#D6E2FE] text-[#212121]">
              <tr>
                <th className="px-[2rem] py-[1.5rem] text-left text-[1.8rem] font-[600] sticky left-0 z-10 bg-[#D6E2FE]">
                  S. No.
                </th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-[2rem] py-[1.5rem] text-left text-[1.8rem] font-[600]"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"
                    } border-t border-[#e5e5e5] hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out cursor-pointer`}
                  >
                    <td
                      className={`sticky left-0 ${
                        rowIndex % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"
                      } px-[2rem] py-[1.5rem] text-[1.8rem] font-medium text-[#212121]`}
                    >
                      {startIndex + rowIndex + 1}.
                    </td>
                    {columns.map((column, colIndex) => {
                      const accessorOutput = column.accessor(row, rowIndex);
                      const isElement = React.isValidElement(accessorOutput);
                      return (
                        <td
                          key={colIndex}
                          className="px-[2rem] py-[1rem] text-[1.8rem] font-medium text-[#212121]"
                        >
                          {tooltipShow === true ? (
                            <Tooltip
                              title={
                                <div style={{ color: "#000" }}>
                                  {isElement ? "" : accessorOutput}
                                </div>
                              }
                              color="#fff"
                              overlayInnerStyle={{
                                color: "#000",
                                background: "#fff",
                              }}
                            >
                              <span>{accessorOutput}</span>
                            </Tooltip>
                          ) : (
                            <span>{accessorOutput}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-[2rem] py-[4rem] text-center text-[1.8rem] text-[#666666]"
                  >
                    <Empty />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end max-md:flex-col gap-[2rem] items-center py-[1rem] mt-[2rem]">
        <div className="item-per-page flex items-center gap-[1rem]">
          <span className="text-[1.8rem] text-[#414141] font-normal">
            {totalItems > 0 ? `${startIndex + 1} - ${endIndex}` : "0 - 0"}
            <span className="text-[#414141]">&nbsp; Out of {totalItems}</span>
          </span>
        </div>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["10", "20", "50", "100"]}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setItemsPerPage(pageSize);
          }}
          onShowSizeChange={(page, pageSize) => {
            setCurrentPage(1);
            setItemsPerPage(pageSize);
          }}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default Table;
