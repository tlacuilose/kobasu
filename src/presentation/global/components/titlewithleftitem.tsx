import React from 'react';
import { Grid, Typography } from '@mui/material';

interface TitleWithLeftItemProps {
  titleVariant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit'
    | undefined;
  title: string;
  children: React.ReactNode;
}

const TitleWithLeftItem = (props: TitleWithLeftItemProps) => (
  <Grid
    container
    direction='row'
    justifyContent='space-between'
    alignItems='center'
  >
    <Grid item>
      <Typography variant={props.titleVariant} component='div'>
        {props.title}
      </Typography>
    </Grid>
    <Grid item>{props.children}</Grid>
  </Grid>
);
export default TitleWithLeftItem;
