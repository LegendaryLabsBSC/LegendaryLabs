import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { legendById } from "@/functions";
import { Legend, ethereum } from "@/types";
import { AllLegendsEnum } from "@/enums";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
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
  const [filteredOut, setFilteredOut] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

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
      m={1}
      width={314}
      height={expandMenu ? 286.5 : 250}
      textAlign="center"
      bgcolor="whitesmoke"
      borderRadius={10}
      style={{ color: "black" }}
    >
      {/* <Grid container item display="flex" justifyContent="flex-end">
        {legendData.prefix.length === 0 && legendData.postfix.length === 0 ? (
          <Typography>Specimen #{legendData.id}</Typography>
        ) : (
          <Typography>
            {legendData.prefix}
            {legendData.postfix}
          </Typography>
        )}
      </Grid> */}
      <Grid container item display="flex" justifyContent="flex-start" md={12}>
        <Box height="250px" width="250px">
          <Box height="250px" width="250px" onClick={() => setFlipCard(false)} className={`animate__animated ${flipCard ? 'animate__fadeIn' : 'animate__fadeOut'}`}>
            <Typography>Season: {legendData.season}</Typography>
            <Typography>ID: {legendData.id}</Typography>
            <Typography>Offspring: {legendData.totalOffspring}</Typography>
            <Typography>Brithday: {legendData.birthday}</Typography>
            <Typography>Legendary: {legendData.isLegendary ? 'Yes' : 'No'}</Typography>
          </Box>
          <img
            className={`animate__animated ${flipCard ? 'animate__fadeOutDown' : 'animate__fadeInUp'}`}
            onClick={() => setFlipCard(true)}
            alt="nft"
            src={legendData.image}
            // width={width ? width : 400}
            // height={legendData.isHatched ? undefined : 400} // incubating legend imgs need to be same resolution/dimensions as legends
            style={{
              // padding: padding ? padding : 25,
              borderRadius: borderRadius ? borderRadius : expandMenu ? '3px 0 3px 0' : '3px 0 0 3px',
              objectFit: 'cover',
              height: '250px',
              width: '250px',
              marginTop: '-280px'
            }}
          />
        </Box>
        <Button style={{ padding: 0, height: 64 }} onClick={() => setExpandMenu(!expandMenu)}>
          {expandMenu ? <MenuOpenIcon /> : <MenuIcon />}
        </Button>
        {expandMenu && legendData.isHatched && (
          <div className="animate__animated animate__fadeInDown animate__faster">
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
        {expandMenu && legendData.isHatchable && (
          // todo: if not hatchable, and not already hatched, show incubation countdown
          <div className="animate__animated animate__fadeInDown animate__faster">
            <Button onClick={() => hatchLegend(legendId)}>Hatch</Button>
          </div>
        )}
      </Grid>
    </Box>
  ) : null; //todo: skeleton card ;; move nft container to here
};
