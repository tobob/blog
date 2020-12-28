import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import QuoteComponent, {
  modelName as QuoteComponentModelName,
} from "../components/quote-component";
import CodeComponent, {
  modelName as CodeComponentModelName,
} from "../components/code-component";
import WallOfTextComponent, {
  modelName as WallOfTextComponentModelName,
} from "../components/wall-of-text-component";

import heroStyles from "../components/hero.module.css";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    const content = () => {
      if (post.contentReferences) {
        return post.contentReferences.map((reference) => {
          switch (reference.__typename) {
            case CodeComponentModelName:
              return <CodeComponent {...reference} />;
            case QuoteComponentModelName:
              return <QuoteComponent {...reference} />;
            case WallOfTextComponentModelName:
              return <WallOfTextComponent {...reference} />;
            default:
              return (
                <span>
                  Nie ma {reference.__typename} {WallOfTextComponentModelName}
                </span>
              );
          }
        });
      }

      return (
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      );
    };

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block",
              }}
            >
              {post.publishDate}
            </p>
            {content()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      contentReferences {
        ...CodeComponentFragment
        ...QuoteComponentFragment
        ...WallOfTextComponentFragment
      }
    }
  }
`;
