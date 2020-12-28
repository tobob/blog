import React from "react";
import { graphql } from "gatsby";
import RichText from "@madebyconnor/rich-text-to-jsx";

const WallOfTextComponent = ({ text }) => <RichText richText={text.json} />;

export default WallOfTextComponent;

export const modelName = "ContentfulWallOfTextComponent";

export const query = graphql`
  fragment WallOfTextComponentFragment on ContentfulWallOfTextComponent {
    text {
      json
    }
    __typename
  }
`;
