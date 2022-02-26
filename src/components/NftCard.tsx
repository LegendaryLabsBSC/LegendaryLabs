import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { legendById } from "@/functions";
import { Legend, ethereum } from "@/types";
import { AllLegendsEnum } from "@/enums";
import {
  legendsMarketplace,
  legendsMatchingBoard,
} from "@/config/contract-addresses";
import { hatchLegend } from "@/functions/legend-actions";

type NftCardProps = {
  legendId: string;
  filter: AllLegendsEnum | undefined;
  width?: string | number;
  padding?: string | number;
  borderRadius?: number;
};

const NftCard = ({
  legendId,
  filter,
  width,
  padding,
  borderRadius,
}: NftCardProps) => {
  const [legendData, setLegendData] = useState<Legend>();
  const [filteredOut, setFilteredOut] = useState<boolean>();

  const { data, loading, error } = useQuery(legendById(legendId));

  const handleFilter = () => {
    setFilteredOut(false); // clear any previous selections
    switch (filter) {
      case "egg":
        if (legendData?.isHatched) setFilteredOut(true);
        break;
      case "hatched":
        if (!legendData?.isHatched) setFilteredOut(true);
        break;
      case "market":
        if (legendData?.ownerOf !== legendsMarketplace) setFilteredOut(true);
        break;
      case "matching":
        if (legendData?.ownerOf !== legendsMatchingBoard) setFilteredOut(true);
        break;
      case "legendary":
        if (!legendData?.isLegendary) setFilteredOut(true);
        break;
      case "destroyed":
        if (!legendData?.isDestroyed) setFilteredOut(true);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    handleFilter();
  }, [filter, filteredOut]);

  useEffect(() => {
    if (!loading) {
      setLegendData(data.legendNFT);
    }
  }, [data, error]);

  return legendData && !filteredOut ? (
    <Box
      pt={5}
      m={1}
      width={500}
      height={500}
      textAlign="center"
      bgcolor="whitesmoke"
      borderRadius={10}
    >
      <>
        {legendData.prefix.length === 0 && legendData.postfix.length === 0 ? (
          <Typography>Specimen #{legendData.id}</Typography>
        ) : (
          <Typography>
            {legendData.prefix}
            {legendData.postfix}
          </Typography>
        )}
        <img
          alt="nft"
          src={legendData.image}
          width={width ? width : 500}
          height={legendData.isHatched ? undefined : 400} // incubating legend imgs need to be same resolution/dimensions as legends
          style={{
            padding: padding ? padding : 25,
            borderRadius: borderRadius ? borderRadius : "2em",
          }}
        />

        {legendData.isHatched && (
          <>
            {/* //todo: conditional on isBlendable: disable with tooltip/info */}
            <Button>Blend</Button>
            <Button>Trade</Button>
            <Button>Match</Button>
            <Button>Rejuvenate</Button>
          </>
        )}
        {legendData.isHatchable && (
          // todo: if not hatchable, and not already hatched, show incubation countdown
          <Button onClick={() => hatchLegend(legendId)}>Hatch</Button>
        )}
      </>
    </Box>
  ) : null; //todo: skeleton card ;; move nft container to here
};

export default NftCard;
