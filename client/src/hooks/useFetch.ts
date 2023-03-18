// Adapted from https://dev.to/techcheck/custom-react-hook-usefetch-eid
import { clone } from "ramda";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const responseCache: { [url: string]: any } = {};
// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = process.env.REACT_APP_API_HOST;

export interface State {
  data?: any;
  error?: string;
  loading?: string;
}

function useFetch(
  resource: string,
  axioOptions?: any,
  acceptCachedResponse: boolean = false
) {
  const [state, setState] = useState<State>({
    data: undefined,
    error: undefined,
    loading: undefined,
  });
  const { token, logout } = useAuth();
  useEffect(() => {
    if (!resource) {
      setState({
        data: undefined,
        error: "URL not specified",
        loading: undefined,
      });
      return;
    }
    const resourceUrl = `${baseURL}/${resource
      .replace(/^\//, "")
      .replace(/\?refresh.+$/, "")}`;
    if (acceptCachedResponse && responseCache[resourceUrl]) {
      setTimeout(() => {
        setState({ data: clone(responseCache[resourceUrl]) });
      }, 0);
    } else {
      setState({
        data: undefined,
        error: undefined,
        loading: `fetching ${resource}`,
      });
      const controller = new AbortController();
      (async () => {
        try {
          const resp = await axios.get(resourceUrl, {
            signal: controller.signal,
            ...axioOptions,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data =
            typeof resp.data === "object" ? resp.data : JSON.parse(resp.data);
          responseCache[resourceUrl] = clone(data);
          setState({ data, error: undefined, loading: undefined });
        } catch (error: any) {
          // ERR_CANCELED is thrown on 'abort'. Ignore those
          if (error.code === "ERR_CANCELED") {
            return;
          }
          if (error.response?.status === 401) {
            logout();
            return;
          }
          setState({
            data: undefined,
            error: `Error fetching ${resource}: ${
              error.response?.data?.message || error.message
            }`,
            loading: undefined,
          });
          console.error(error);
        } finally {
          controller.abort("Completed");
        }
      })();
    }
  }, [resource]);

  return state;
}

export default useFetch;
