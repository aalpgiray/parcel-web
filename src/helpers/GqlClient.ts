import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  DefaultOptions,
  ApolloQueryResult,
  from,
} from "apollo-boost";
import { getAuthState } from "./authentication";
import { notification } from "antd";
import { store } from "../store";
import { formatMessage } from "./locale/i18n";
import { onError } from "apollo-link-error";
import { ServerError, ServerParseError } from "apollo-link-http-common";
import { setContext } from "apollo-link-context";

// import { showNotification } from "../helpers";
// import store from "../../store/store";
// import { updateShowLogin } from "../../actions/actions";
// import i18n from "../../translations/i18n";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = (uri: string) =>
  new HttpLink({
    uri,
  });

const headersLink = (headers: Record<string, any>) =>
  setContext((_, { _headers }) => {
    return {
      headers: {
        ..._headers,
        ...headers,
        authorization: getAuthState().token
          ? `Bearer ${getAuthState().token}`
          : "",
      },
    };
  });

function isServerError(
  networkError: Error | ServerError | ServerParseError | undefined,
): networkError is ServerError {
  return (networkError as any).statusCode !== undefined;
}

const authorizeLink = onError(({ networkError }) => {
  if (
    networkError &&
    isServerError(networkError) &&
    networkError.statusCode === 401
  ) {
    store.dispatch({
      type: "@action.login.setVisible",
      payload: true,
    });
  }
});

const getClient = (uri: string, headers: Record<string, any>) => {
  const client = new ApolloClient({
    link: from([headersLink(headers), authorizeLink, httpLink(uri)]),
    cache: new InMemoryCache(),
    defaultOptions,
  });

  return client;
};

export interface QueryParameters {
  uri: string;
  query: string;
  variables?: any;
  headers?: Record<string, any>;
}

export interface MutateParameters {
  uri: string;
  mutation: string;
  variables?: any;
  headers?: Record<string, any>;
}

export class GqlClient {
  public static async query<T = any>({
    uri,
    query,
    variables,
    headers = {},
  }: QueryParameters) {
    const client = getClient(uri, headers);

    const result = await client.query<T>({
      query,
      variables,
    });

    this.handleErrors(result);

    return result;
  }

  public static async mutate<T = any>({
    uri,
    mutation,
    variables,
    headers = {},
  }: MutateParameters) {
    const client = getClient(uri, headers);

    const result: ApolloQueryResult<T> = await client.mutate<T>({
      mutation,
      variables,
    });

    this.handleErrors(result);

    return result;
  }

  private static handleErrors<T>(result: ApolloQueryResult<T>) {
    if (
      result &&
      result.errors &&
      result.errors.some((err) => err.extensions.code === "Authenticate")
    ) {
      store.dispatch({
        type: "@action.login.setVisible",
        payload: true,
      });
      return;
    }

    if (
      result &&
      result.errors &&
      result.errors.some((err) => err.extensions.code === "Authorization")
    ) {
      notification.error({
        message: formatMessage("Request.notification.notAuthorized.message"),
        description: formatMessage(
          "Request.notification.notAuthorized.description",
        ),
      });
      return;
    }

    if (result && result.errors) {
      notification.error({
        message: formatMessage("SomethingWentWrong"),
      });
      return;
    }
  }
}
