import styled from "styled-components";
import { Card, Typography, TypographyProps } from "@mui/material";

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
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
