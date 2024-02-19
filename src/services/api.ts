import { createApi } from "@reduxjs/toolkit/query/react";
import { request, gql } from "graphql-request";

const endpoint = "https://api.escuelajs.co/graphql";

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (arg, api, extraOptions) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    try {
      const data = await request({
        url:endpoint, 
        document:arg, 
        requestHeaders: headers,
      });
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
    register: builder.mutation({
      query: ({ name, email, password, avatar }) => gql`
        mutation {
          addUser(
            data: {
              name: "${name}"
              email: "${email}"
              password: "${password}"
              avatar: "${avatar}"
            }
          ) {
            id
            name
            avatar
          }
        }
      `,
    }),
    isEmailAvailable: builder.query({
      query: (email) => gql`
        query {
          isAvailable(email: "${email}")
        }
      `,
    }),
    getUserProfile: builder.query({
      query: () => gql`
        query {
          myProfile {
            id
            name
            avatar
          }
        }
      `,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLoginMutation,
  useRegisterMutation,
  useIsEmailAvailableQuery,
  useGetUserProfileQuery,
} = api;
