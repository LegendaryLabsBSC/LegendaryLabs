import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import NftCard from "../NftCard";
import { ethereum } from "@/types";
import { BigNumber, ethers } from "ethers";
import MetaMaskConnection from "../MetaMaskConnection/MetaMaskConnection";
import { Grid } from "@mui/material";
import TOTAL_NFT_SUPPLY from "@/graphql/total-nft-supply";
import ReactPaginate from "react-paginate";
import { LegendSorting } from "./components/LegendSorting";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const signer: any = provider.getSigner();

type AllLegendsProps = {
  itemsPerPage: number;
};

export const AllLegends: React.FC<AllLegendsProps> = ({ itemsPerPage }) => {
  const [legendTotal, setLegendTotal] = useState<number>();
  const [filter, setFilter] = useState<string>();

  const { data, loading, error, refetch, fetchMore } =
    useQuery(TOTAL_NFT_SUPPLY);

  const legends: number[] = [...Array(legendTotal).keys()];

  const [currentItems, setCurrentItems] = useState<number[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % legends.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (!loading) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(legends.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(legends.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, legendTotal]);

  useEffect(() => {
    if (!loading) setLegendTotal(data.totalNFTSupply.total);
  }, [data, error]);

  return (
    <>
      <Grid display="flex" justifyContent="space-between" p={5} >
        <LegendSorting setFilter={setFilter} value={filter} />
        <MetaMaskConnection />
      </Grid>
      <Grid display="flex" justifyContent="center" flexWrap="wrap">
        {data &&
          [...Array(21)].map((empty: any, legendId: any) => (
            // [...Array(legendTotal)].map((empty: any, legendId: any) => (
            // currentItems?.map((legendId: any, itemIndex: any) => (
            <NftCard
              key={legendId}
              filter={filter}
              legendId={`${legendId + 1}`}
            />
          ))}
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
