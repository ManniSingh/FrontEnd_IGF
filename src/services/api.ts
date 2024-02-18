import { createApi } from "@reduxjs/toolkit/query/react";
import { request, gql } from "graphql-request";

const endpoint = "https://api.escuelajs.co/graphql";

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (arg) => {
    try {
      const data = await request(endpoint, arg);
      return { data };
    } catch (error) {
      return { error };
    }
  },
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => gql`
        query {
          products {
            id
            title
            price
            description
            images
            category {
              id
              name
              image
            }
          }
        }
      `,
    }),
    login: builder.mutation({
      query: ({ email, password }) => gql`
        mutation {
          login(email: "${email}", password: "${password}") {
            access_token
            refresh_token
          }
        }
      `,
    }),
  }),
});

export const { useGetProductsQuery, useLoginMutation } = api;
