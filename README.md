# FakeAPI utilisation based demo


# Table of Contents
  - [Introduction](#Introduction)
  - [Deployment](#Deployment)
  - [Libraries](#Libraries)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Features](#features)
  - [API Endpoint](#api-endpoint)

## Introduction

This a toy project based on [FakeApi](https://fakeapi.platzi.com/) done for the partial fulfillment of frontend part of fullstack course by Integrify oy. It demonstrates the potential usage of backend interface provided.

## Deployment

The deployment link is: [https://mannisingh.github.io/fs17-Frontend-project/](https://mannisingh.github.io/fs17-Frontend-project/)

## Libraries

- **Redux**: State life cycle is done primarily in redux store.
- **RTK Query**: API query abstraction layer.
- **GraphQL**: Accepts queries for resolvers. 
- **Material-UI**: CSS abstraction layer.
- **React Hook Form**: Form handling abstraction layer.
- **Jest**: for the unit testing. 

## Getting started

1. Clone the repository.

   ```bash
   git clone git@github.com:ManniSingh/fs17-Frontend-project.git

   ```

2. Navigate to the project directory.

   ```bash
   cd fs17-Frontend-project/src

   ```

3. Install dependencies.
   ```bash
   npm install
   ```

# Usage

1. To start the App
   ```bash
   npm start
   ```
2. Use the following command to run tests:
   ```bash
   npm run test
   ```

# Features

**All Products Page**: Displays a list of all available products.
- **Product Page**: Shows detailed information about a specific product.
- **Profile Page**: Accessible only when the user is logged in, providing personalized information and settings.
- **Cart Page/Modal**: Displays the items added to the cart for purchase.

**Fetching all products**
- **Finding a single product**
- **Filtering products by categories**
- **Sorting products by price**
- **Creating a product** (Admin-only)
- **Updating a product** (Admin-only)
- **Deleting a product** (Admin-only)

**User**
- **User registration**
- **User login**
- **User profile**

**Cart**
- **Adding a product to the cart**
- **Removing a product from the cart**
- **Updating the quantity of products in the cart**

**Extra**
-**Server side pagination**
-**Home button**

## API Endpoint

- [https://api.escuelajs.co/graphql](https://api.escuelajs.co/graphql).
