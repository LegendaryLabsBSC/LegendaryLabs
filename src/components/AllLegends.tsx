import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import NftCard from "./NftCard";
import { ethereum } from "@/types";
import { BigNumber, ethers } from "ethers";
import MetaMaskConnection from "./MetaMaskConnection/MetaMaskConnection";
import { Flex, HStack, Select, SimpleGrid } from "@chakra-ui/react";
import TOTAL_NFT_SUPPLY from "@/graphql/total-nft-supply";
import { AllLegendsEnum } from "@/enums";
import ReactPaginate from "react-paginate";

const provider: ethers.providers.Web3Provider =
  new ethers.providers.Web3Provider(ethereum);

const signer: any = provider.getSigner();

const NftContainer = styled.div`
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
  setFilter: any;
};

const LegendsSorting = ({ setFilter }: LegendsSortingProps) => {
  const handleSetFilter = (value: any) => {
    setFilter(value);
  };

  return (
    <Select onChange={(e) => handleSetFilter(e.target.value)}>
      <option value={undefined}>All</option>
      <option value={AllLegendsEnum.Hatched}>Hatched</option>
      <option value={AllLegendsEnum.Unhatched}>Unhatched</option>
      {/* <option value={AllLegendsEnum.Blendable}>Blendable</option> //todo: */}
      <option value={AllLegendsEnum.InMarketplace}>In Marketplace</option>
      <option value={AllLegendsEnum.OnMatchingBoard}>On Matching Board</option>
      <option value={AllLegendsEnum.Legendary}>Legendary</option>
      <option value={AllLegendsEnum.Destroyed}>Destroyed</option>
    </Select>
  );
};

type AllLegendsProps = {
  itemsPerPage: number;
};

export const AllLegends = ({ itemsPerPage }: AllLegendsProps) => {
  const [legendTotal, setLegendTotal] = useState<number>();
  const [filter, setFilter] = useState<AllLegendsEnum | undefined>();

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
      <HStack pos="absolute" right={0}>
        <LegendsSorting setFilter={setFilter} />
        <MetaMaskConnection />
      </HStack>
      <SimpleGrid columns={3} spacing={10} pt={100}>
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
      </SimpleGrid>
    </>
  );
};
