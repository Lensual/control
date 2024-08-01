import { request as axiosInstance } from '@/utils/request';

import * as control from './control/typescript-axios';

export const RouteApi = control.RouteApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const PluginApi = control.PluginApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const SchemaApi = control.SchemaApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const ServiceApi = control.ServiceApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const UpstreamApi = control.UpstreamApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const HealthCheckApi = control.HealthCheckApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const PluginMetadataApi = control.PluginMetadataApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const ServiceDiscoveryApi = control.ServiceDiscoveryApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);

export const GarbageCollectionApi = control.GarbageCollectionApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/control`,
  axiosInstance.getAxios(),
);
