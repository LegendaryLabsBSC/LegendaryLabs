import React, { useContext, useEffect, useState } from "react";
import {
  MetaMaskContext,
  MetaMaskContextType,
} from "@/context/metaMaskContext";
import { BigNumber, ethers } from "ethers";
import MetaMaskConnection from "../metamask-connection/MetaMaskConnection";
import { Grid } from "@mui/material";
import ReactPaginate from "react-paginate";
import { TokenOfOwnerByIndex } from "../legend-nft-card/withOwner";
// import { LegendSorting } from "./components/LegendSorting";

type MyLegendsProps = {
  itemsPerPage: number;
};

export const MyLegends: React.FC<MyLegendsProps> = ({ itemsPerPage }) => {
  const [userTotal, setUserTotal] = useState<number[]>();
  const [filter, setFilter] = useState<string>();

  const { wallet, balances } = useContext(
    MetaMaskContext
  ) as MetaMaskContextType;

  useEffect(() => {
    if (balances.nft) {
      const total: number[] = [...Array(Number(balances.nft)).keys()];
      setUserTotal(total);
    }
  }, [balances.nft]);

  const [currentItems, setCurrentItems] = useState<number[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % userTotal!.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (userTotal) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(userTotal.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(userTotal.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, userTotal]);

  return (
    <>
      <Grid display="flex" justifyContent="space-between" p={5}>
        <MetaMaskConnection />
        {/* <LegendSorting setFilter={setFilter} value={filter} /> */}
      </Grid>
      <Grid display="flex" justifyContent="center" flexWrap="wrap">
        {userTotal &&
          userTotal.map(
            (empty, index): Record<never, string> => (
              <TokenOfOwnerByIndex
                key={index}
                filter={""}
                address={wallet}
                legendIndex={`${index}`}
              />
            )
          )}
      </Grid>
      <Grid container item justifyContent="center" md={12} py={10}>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={undefined}
        />
      </Grid>
    </>
  );
};
