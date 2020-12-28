import React from "react"
import { graphql } from "gatsby"

const CodeComponent = () => <div><span></span></div>

export default CodeComponent

export const query = graphql`
  fragment CodeComponentFragment on ContentfulCodeComponent {
    url
    __typename
  }
`
