import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
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
  const [hatchedFunction, setHatchedFunction] = useState<string>();
  const [unhatchedFunction, setUnhatchedFunction] = useState<string>();
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

  const hatchedFunctions: {[key: string]: () => void} = {
    Blend: () => alert('Blent!'),
    Trade: () => alert('Traded!'),
    Match: () => alert('Matched!'),
    Rejuvenate: () => alert('Rejuvenated!'),
  }

  const unhatchedFunctions: {[key: string]: () => void} = {
    Hatch: () => alert('Hatched!'),
  }

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
      width={250}
      height={300}
      textAlign="center"
      bgcolor="whitesmoke"
      borderRadius={1}
      style={{
        color: 'black',
        border: 'solid 1px whitesmoke'
      }}
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
      <Grid container item display="flex" justifyContent="flex-start" md={12}>
        <img
          alt="nft"
          src={legendData.image}
          // width={width ? width : 400}
          // height={legendData.isHatched ? undefined : 400} // incubating legend imgs need to be same resolution/dimensions as legends
          style={{
            borderRadius: '3px 3px 0 0',
            objectFit: 'cover',
            height: '250px',
            width: '248px',
          }}
        />
        {/* <Box height="250px" width="248px">
          <Typography>Season: {legendData.season}</Typography>
          <Typography>ID: {legendData.id}</Typography>
          <Typography>Offspring: {legendData.totalOffspring}</Typography>
          <Typography>Brithday: {legendData.birthday}</Typography>
          <Typography>Legendary: {legendData.isLegendary ? 'Yes' : 'No'}</Typography>
        </Box> */}
        {legendData.isHatched && (
          <Grid display="flex" md={12} p={1}>
            <FormControl size="small" fullWidth>
              <InputLabel>Action</InputLabel>
              <Select label="Action" onChange={(e) => setHatchedFunction(String(e.target.value))}>
                <MenuItem value="Blend">Blend</MenuItem>
                <MenuItem value="Trade">Trade</MenuItem>
                <MenuItem value="Match">Match</MenuItem>
                <MenuItem value="Rejuvenate">Rejuvenate</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ borderRadius: 8,
              backgroundColor: 'lightgray', marginLeft: 1 }}
              onClick={() => hatchedFunction && hatchedFunctions[hatchedFunction]()}
              disabled={!hatchedFunction}
            >
              {'>>'}
            </Button>
          </Grid>
        )}
        {legendData.isHatchable && (
          // todo: if not hatchable, and not already hatched, show incubation countdown
          <Grid display="flex" md={12}>
            <FormControl size="small" fullWidth>
              <InputLabel>Action</InputLabel>
              <Select label="Action" onChange={(e) => setUnhatchedFunction(String(e.target.value))}>
                <MenuItem value="Hatch">Hatch</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ borderRadius: 8,
              backgroundColor: 'lightgray', marginLeft: 1 }}
              onClick={() => unhatchedFunction && unhatchedFunctions[unhatchedFunction]()}
              disabled={!unhatchedFunction}
            >
              {'>>'}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  ) : null; //todo: skeleton card ;; move nft container to here
};

export default NftCard;
