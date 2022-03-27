import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

const shortcodes = { Link } // Provide common components here

export default function PageTemplate ({ data: { mdx } }) {
  return (
    <div className="prose prose-xl">
      <MDXProvider components={shortcodes}>
        <MDXRenderer frontmatter={mdx.frontmatter}>
          {mdx.body}
        </MDXRenderer>
      </MDXProvider>
    </div>
  )
}

export const query = graphql`
  query ArticleQuery($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`