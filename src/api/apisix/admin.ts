import { VAxios } from '@/utils/request/Axios';

import * as admin from './admin/typescript-axios';

const vaxios = new VAxios({
  headers: {
    'X-API-Key': 'cgy7tC70C&d^tvXc',
  },
});

export const ProtoApi = admin.ProtoApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const RouteApi = admin.RouteApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const PluginApi = admin.PluginApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const SecretApi = admin.SecretApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const ServiceApi = admin.ServiceApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const ConsumerApi = admin.ConsumerApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const UpstreamApi = admin.UpstreamApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const SSLApi = admin.SSLApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const GlobalRuleApi = admin.GlobalRuleApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const StreamRouteApi = admin.StreamRouteApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const PluginConfigApi = admin.PluginConfigApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const ConsumerGroupApi = admin.ConsumerGroupApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);

export const PluginMetadataApi = admin.PluginMetadataApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);
export const SchemaValidationApi = admin.SchemaValidationApiFactory(
  undefined,
  `${import.meta.env.VITE_API_URL_PREFIX}/apisix/admin`,
  vaxios.getAxios(),
);
