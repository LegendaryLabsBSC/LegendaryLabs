import React, { useState, useEffect } from "react";
import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { legendById } from "@/functions";
import { Legend } from "@/types";
import { useLocation } from "react-router-dom";

export const SingleLegend: React.FC = () => {
  const [legendData, setLegendData] = useState<Legend>();
  const legendId = legendById(useLocation().pathname.split('/')[2])
  const { data, loading, error } = useQuery(legendId);
  
  useEffect(() => {
    if (!loading) {
      setLegendData(data.legendNFT);
    }
  }, [data, error]);

  const sx: SxProps<Theme> = { 
      fontSize: 11,
      whiteSpace: 'nowrap',
      color: legendData?.isLegendary ? 'hotpink' : 'black'
  }

  return legendData ? (
    <Box
      ml={5}
      mt={1}
      width={514}
      height={490}
      textAlign="center"
      bgcolor="whitesmoke"
      borderRadius={1}
      style={{color: 'black'}}
      border="solid 1px whitesmoke"
    >
      <Grid container item display="flex" justifyContent="flex-start" md={12} position="relative">
          <img
            alt="nft"
            src={legendData.image}
            style={{
              borderRadius: '3px 3px 0 0',
              objectFit: 'cover',
              width: '512px',
              height: '450px',
            }}
          />
          <Typography
            color="white"
            position="absolute"
            bottom={0}
            mb={5}
            ml={5}
            display="flex"
            flexDirection="row"
            justifySelf="center"
          >
            {legendData.name || 'NAME'}
          </Typography>
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
