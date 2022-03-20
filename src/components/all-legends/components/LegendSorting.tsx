import { AllLegendsEnum } from '@/enums';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'

type LegendSortingProps = {
  setFilter: (value: string) => void;
  value?: string;
};

export const LegendSorting: React.FC<LegendSortingProps> = ({ setFilter, value }) => 
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