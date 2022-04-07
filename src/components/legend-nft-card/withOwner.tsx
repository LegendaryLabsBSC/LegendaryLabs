import { legendsNFTContract } from "@/config/legendary-labs-contracts";
import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { LegendNFTCard } from "./LegendNFTCard";

type TokenOfOwnerByIndexProps = {
  filter: string;
  address: string;
  legendIndex: string;
};

export const TokenOfOwnerByIndex: React.FC<TokenOfOwnerByIndexProps> = ({
  filter,
  address,
  legendIndex,
}) => {
  const [legendId, setLegendId] = useState<string | undefined>(undefined);

  console.log(legendIndex);

  async function fetchLegendId() {
    const id: BigNumber = await legendsNFTContract.tokenOfOwnerByIndex(
      address,
      legendIndex
    );

    setLegendId(id.toString());
  }

  useEffect(() => {
    fetchLegendId();
  }, []);

  return legendId ? (
    <>
      <LegendNFTCard filter={filter} legendId={legendId} />
    </>
  ) : null;
};
