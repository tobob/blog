import React from "react";
import { graphql } from "gatsby";

const QuoteComponent = ({ quote, author, theme }) => (
  <div
    style={{
      backgroundColor: theme,
      padding: "30px",
      width: "80%",
      margin: "0 0 auto",
    }}
  >
    <div
      style={{ fontSize: "40px" }}
      dangerouslySetInnerHTML={{
        __html: quote.childMarkdownRemark.html,
      }}
    />
    <h4 style={{ width: "100%", textAlign: "right", fontStyle: "italic" }}>
      ---- {author}
    </h4>
  </div>
);

export default QuoteComponent;

export const modelName = "ContentfulQuoteComponent";

export const query = graphql`
  fragment QuoteComponentFragment on ContentfulQuoteComponent {
    quote {
      childMarkdownRemark {
        html
      }
    }
    author
    theme
    __typename
  }
`;
