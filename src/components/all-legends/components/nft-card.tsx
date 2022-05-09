import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Link, SpeedDial, SpeedDialAction, SxProps, Theme, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { legendById } from "@/functions";
import { Legend, ethereum } from "@/types";
import { AllLegendsEnum } from "@/enums";
import MenuIcon from '@mui/icons-material/Menu';
import BlenderIcon from '@mui/icons-material/Blender';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import RestoreIcon from '@mui/icons-material/Restore';
import EggIcon from '@mui/icons-material/Egg';
import {
  legendsMarketplace,
  legendsMatchingBoard,
} from "@/config/contract-addresses";
import { hatchLegend } from "@/functions/legend-actions";
import 'animate.css'

type NftCardProps = {
  legendId: string;
  filter?: string;
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
  const [filteredOut, setFilteredOut] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

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

  interface Action {
    icon: JSX.Element;
    name: string;
    onClick: () => void;
  }

  const actions: Action[] = [
    {
      icon: <BlenderIcon/>,
      name: 'Blend',
      onClick: () => alert("Blent!")
    },{
      icon: <SwapHorizIcon/>,
      name: 'Trade',
      onClick: () => alert("Traded!")
    },{
      icon: <JoinInnerIcon/>,
      name: 'Match',
      onClick: () => alert("Matched!")
    },{
      icon: <RestoreIcon/>,
      name: 'Rejuvenate',
      onClick: () => alert("Rejuvenated!")
    },
  ]

  const sx: SxProps<Theme> = { 
      fontSize: 11,
      whiteSpace: 'nowrap',
      color: legendData?.isLegendary ? 'hotpink' : 'black'
    }

  return legendData && !filteredOut ? (
    <Box
      m={1}
      width={314}
      height={expandMenu ? 286.5 : 290}
      textAlign="center"
      bgcolor="whitesmoke"
      borderRadius={1}
      style={{color: 'black'}}
      border="solid 1px whitesmoke"
    >
      {/* <Grid container item display="flex" justifyContent="flex-end">
        {legendData.prefix.length === 0 && legendData.postfix.length === 0 ? (
          <Typography >Specimen #{legendData.id}</Typography>
        ) : (
          <Typography>
            {legendData.prefix}
            {legendData.postfix}
          </Typography>
        )}
      </Grid> */}
      <Grid container item display="flex" justifyContent="flex-start" md={12} position="relative">
          <img
            onClick={() => setFlipCard(true)}
            alt="nft"
            src={legendData.image}
            // width={width ? width : 400}
            // height={legendData.isHatched ? undefined : 400} // incubating legend imgs need to be same resolution/dimensions as legends
            style={{
              // padding: padding ? padding : 25,
              borderRadius: borderRadius ? borderRadius : '3px 0 0 0',
              objectFit: 'cover',
              height: '250px',
              width: '250px',
            }}
          />
          <Link
            underline="hover"
            position="absolute"
            bottom={0}
            mb={5}
            ml={5}
            display="flex"
            flexDirection="row"
            justifySelf="center"
            href={`/legends/${legendData.id}`}
          >
            <Typography color="white">{legendData.name || 'NAME'}</Typography>
          </Link>
          <SpeedDial
            ariaLabel="speed"
            direction="down"
            icon={legendData.isHatchable ? <EggIcon /> : <MenuIcon />}
            onClick={() => legendData.isHatchable && alert('Hatched!')}
            FabProps={{
              size: 'small',
              style: { backgroundColor: '#666666' }
            }}
            sx={{
              position: 'relative',
              top: 5,
              right: -7,
              zIndex: 0
            }}>
            {legendData.isHatched && actions.map(({ icon, name, onClick }: Action) => 
              <SpeedDialAction
                sx={{ height: 30, margin: '5px' }}
                FabProps={{ size: 'small' }}
                key={name}
                icon={icon}
                tooltipTitle={name}
                onClick={onClick}
              />
            )}
          </SpeedDial>
          <Grid container item md={12} display="inline-flex" textAlign="left" pl={1/2} pt={1/2}>
            <Grid item md={6}><Typography sx={sx}>Season: {legendData.season}</Typography></Grid>
            <Grid item md={6}><Typography sx={sx}>ID: {legendData.id}</Typography></Grid>
            <Grid item md={6}><Typography sx={sx}>Offspring: {legendData.totalOffspring}</Typography></Grid>
            <Grid item md={6}><Typography sx={sx}>Brithday: {legendData.birthday}</Typography></Grid>
          </Grid>
      </Grid>
    </Box>
  ) : null; //todo: skeleton card ;; move nft container to here
};

export default NftCard;
