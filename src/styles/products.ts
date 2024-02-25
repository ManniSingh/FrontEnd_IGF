import styled, { CSSObject } from "styled-components";
import {
  Card,
  Grid,
  GridProps,
  Typography,
  TypographyProps,
} from "@mui/material";

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
  width: 345px;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const IconButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 140px;
  object-fit: cover;
`;

interface StyledGridProps extends GridProps {
  justifyContent?: CSSObject["justifyContent"];
  marginTop?: string;
  itemMargin?: string;
  spacing?: string;
}

export const StyledGrid = styled(Grid)<StyledGridProps>`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: ${(props) => props.justifyContent || "space-around"};
    margin-top: ${(props) => props.marginTop || "20px"};
  }
`;

export const ProductTitle = styled(Typography).attrs(
  (props: TypographyProps) => ({
    variant: props.variant || "h5",
    component: props.component || "h2",
  })
)<TypographyProps>``;

export const ProductDescription = styled(Typography).attrs(
  (props: TypographyProps) => ({
    variant: props.variant || "body2",
    color: props.color || "textSecondary",
    component: props.component || "p",
  })
)<TypographyProps>``;

export const ProductPrice = styled(Typography).attrs(
  (props: TypographyProps) => ({
    variant: props.variant || "h6",
    component: props.component || "p",
  })
)<TypographyProps>``;
