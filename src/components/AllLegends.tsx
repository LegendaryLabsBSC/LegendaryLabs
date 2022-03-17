import React, { useEffect, useState } from "react";
import {styled} from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import NftCard from "./NftCard";
import { ethereum } from "@/types";
import { BigNumber, ethers } from "ethers";
import MetaMaskConnection from "./MetaMaskConnection/MetaMaskConnection";
import { Select, Grid, FormControl, MenuItem, InputLabel } from "@mui/material";
import TOTAL_NFT_SUPPLY from "@/graphql/total-nft-supply";
import { AllLegendsEnum } from "@/enums";
import ReactPaginate from "react-paginate";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const signer: any = provider.getSigner();

const NftContainer = styled('div')`
  & {
    padding: 25px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    div {
      margin: 25px;
    }
  }
`;

type LegendsSortingProps = {
  setFilter: (value: string) => void;
  value?: string;
};

const LegendsSorting: React.FC<LegendsSortingProps> = ({ setFilter, value }) => {

  const StyledSelect = styled(Select)`
    border: 'solid 1px hotpink';
    background-color: 'hotpink';
  `

  return (
    <FormControl style={{ width: 200, borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
      {!value && <InputLabel shrink={false} style={{ color: 'black' }}>Filter</InputLabel>}
      <Select value={value} onChange={(e) => setFilter(e.target.value)}>
        <MenuItem value={undefined}>All</MenuItem>
        <MenuItem value={AllLegendsEnum.Hatched}>Hatched</MenuItem>
        <MenuItem value={AllLegendsEnum.Unhatched}>Unhatched</MenuItem>
        {/* <option value={AllLegendsEnum.Blendable}>Blendable</option> //todo: */}
        <MenuItem value={AllLegendsEnum.InMarketplace}>In Marketplace</MenuItem>
        <MenuItem value={AllLegendsEnum.OnMatchingBoard}>On Matching Board</MenuItem>
        <MenuItem value={AllLegendsEnum.Legendary}>Legendary</MenuItem>
        <MenuItem value={AllLegendsEnum.Destroyed}>Destroyed</MenuItem>
      </Select>
    </FormControl>
  );
};

type AllLegendsProps = {
  itemsPerPage: number;
};

export const AllLegends = ({ itemsPerPage }: AllLegendsProps) => {
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
        <LegendsSorting setFilter={setFilter} value={filter} />
        <MetaMaskConnection />
      </Grid>
      <Grid pt={10} display="flex" justifyContent="center" flexWrap="wrap">
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
