import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LegendNFTCard } from "../legend-nft-card/LegendNFTCard";
import { ethereum } from "@/types";
import { BigNumber, ethers } from "ethers";
import MetaMaskConnection from "../metamask-connection/MetaMaskConnection";
import { Grid } from "@mui/material";
import TOTAL_NFT_SUPPLY from "@/graphql/total-nft-supply";
import ReactPaginate from "react-paginate";
import { LegendSorting } from "./components/LegendSorting";
import NftCard from "./components/nft-card";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const signer: any = provider.getSigner();

type AllLegendsProps = {
  itemsPerPage: number;
};

export const AllLegends: React.FC<AllLegendsProps> = ({ itemsPerPage }) => {
  const [legendTotal, setLegendTotal] = useState<number[]>();
  const [filter, setFilter] = useState<string>();

  const { data, loading, error, refetch, fetchMore } =
    useQuery(TOTAL_NFT_SUPPLY);

  useEffect(() => {
    if (!loading) {
      const legends: number[] = [...Array(data.totalNFTSupply.total).keys()];
      setLegendTotal(legends);
    }
  }, [data, error]);

  const [currentItems, setCurrentItems] = useState<number[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % legendTotal!.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (legendTotal) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(legendTotal.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(legendTotal.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, legendTotal]);

  return (
    <>
      <Grid display="flex" justifyContent="space-between" p={5}>
        <LegendSorting setFilter={setFilter} value={filter} />
        <MetaMaskConnection />
      </Grid>
      <Grid display="flex" justifyContent="center" flexWrap="wrap">
        {legendTotal &&
          legendTotal.map(
            (empty, legendId): Record<never, string> => (
              // currentItems?.map((legendId: any, itemIndex: any) => (
              <NftCard
                key={legendId}
                filter={filter}
                legendId={`${legendId + 1}`}
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
