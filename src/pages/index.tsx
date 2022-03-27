import * as React from "react";
import { Link, graphql } from "gatsby";

const IndexPage = ({
  data: {
    allMdx: { nodes: articles },
  },
}) => (
  <div className="p-4 md:p-0">
    {process.env.NODE_ENV === "development" && (
      <pre className="my-4">{JSON.stringify(articles)}</pre>
    )}
    <ul>
      {articles.map((article) => (
        <li>
          <Link
            className="text-xl text-blue-500 hover:border-b hover:border-b-blue-500"
            to={`/articles/${article.slug}`}
          >
            {article.slug}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const query = graphql`
  query {
    allMdx {
      nodes {
        slug
      }
    }
  }
`;

export default IndexPage;
