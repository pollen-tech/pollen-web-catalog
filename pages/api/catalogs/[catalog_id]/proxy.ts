import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "~/config";

export const proxy = createProxyMiddleware({
target: config.lms.endpoint,
secure: false,
pathRewrite: {
    // change path proxy to the lms endpoint
    api: ``,
},
headers: {
    API_KEY: config.lms.apiKey,
},
})