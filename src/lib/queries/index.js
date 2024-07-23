import { gql } from "@apollo/client";

export const GET_ALL_PLUGINS = gql`
  query getAllPlugins($where: plugins_bool_exp!) {
    plugins(where: $where, order_by: { title: asc }) {
      title
      amount
      currencyCode
      id
      Inhouse
      img_url
    }
  }
`;

export const GET_FILTERED_PLUGINS = gql`
  query getFilteredPlugins($where: plugins_bool_exp!) {
    plugins(where: $where, order_by: { title: asc }) {
      title
      amount
      currencyCode
      id
      img_url
    }
  }
`;

export const GET_SINGLE_PLUGIN_INFORMATION = gql`
  query getSinglePluginsInformation($where: plugins_bool_exp!) {
    plugins(where: $where) {
      title
      amount
      currencyCode
      id
      description
      category_id
      img_url
    }
  }
`;

export const GET_ALL_PLUGIN_CATEGORIES = gql`
  query getAllPluginCategories {
    plugins_category(order_by: { category: asc }) {
      id
      category
    }
  }
`;

export const GET_PLUGINS_BY_CATEGORY = gql`
  query getPluginsByCategory($where: plugins_bool_exp!) {
    plugins {
      title
      amount
      currencyCode
      id
      description
    }
  }
`;

export const GET_HOME_PAGE_PLUGINS = gql`
  query getHomePagePlugins($limit: Int!) {
    plugins(order_by: { created_at: desc }, limit: $limit) {
      title
      amount
      currencyCode
      id
      description
      img_url
    }
  }
`;
