import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { legendById } from "@/functions";
import { Legend, ethereum } from "@/types";
import { AllLegendsEnum } from "@/enums";
import {
  legendsMarketplace,
  legendsMatchingBoard,
} from "@/config/contract-addresses";
import { hatchLegend } from "@/functions/legend-actions";
import { legendsNFTContract } from "@/config/legendary-labs-contracts";
import {
  MetaMaskContext,
  MetaMaskContextType,
} from "@/context/metaMaskContext";
// import { BlendingDialog } from "../blending-dialog/BlendingDialog";

type LegendCardProps = {
  legendId: string;
  filter?: string;
  width?: string | number;
  padding?: string | number;
  borderRadius?: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const LegendNFTCard: React.FC<LegendCardProps> = ({
  legendId,
  filter,
  width,
  padding,
  borderRadius,
}) => {
  const [legendData, setLegendData] = useState<Legend>();
  const [filteredOut, setFilteredOut] = useState<boolean>();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { wallet, balances } = useContext(
    MetaMaskContext
  ) as MetaMaskContextType;

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
      case "owned":
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
      style={{ color: "black" }}
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
            <Button onClick={handleOpen}>Blend</Button>
            <Button>Trade</Button>
            <Button>Match</Button>
            <Button>Rejuvenate</Button>
            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <BlendingDialog parentOne={legendData} />
              </Box>
            </Modal> */}
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
