import React from "react";
import { graphql } from "gatsby";
import Gist from "super-react-gist";

const CodeComponent = ({ url }) => (
  <Gist url={url} />
);

export default CodeComponent;

export const modelName = "ContentfulCodeComponent";

export const query = graphql`
  fragment CodeComponentFragment on ContentfulCodeComponent {
    url
    __typename
  }
`;
