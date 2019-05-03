const baseUrl = "http://ec2-34-211-174-204.us-west-2.compute.amazonaws.com"; // "http://localhost"
const baseUrl2 = "http://ec2-34-216-224-141.us-west-2.compute.amazonaws.com"; // "http://localhost"

export const CompanyGraphQL = baseUrl + ":41004/api/CompanyGraphQL";
export const AuthenticationGraphQL =
  baseUrl + ":41001/api/AuthenticationGraphQL";
export const AuthorizationGraphQL = baseUrl + ":41002/api/AuthorizationGraphQL";
export const UserGraphQL = baseUrl + ":41003/api/UserGraphQL";

export const DatasetGraphQL = baseUrl2 + ":41007/api/DatasetGraphQL";
export const MediaServerURL = baseUrl2 + ":41008";
// export const PlantGraphQLURL = baseUrl2 + ":41006"; // "http://localhost:4000";
export const AssetGraphQLURL = baseUrl2 + ":41005"; // "http://localhost:4001";

// export const DatasetGraphQL = "https://localhost:5001/api/DatasetGraphQL"; // baseUrl2 + ":41007/api/DatasetGraphQL";
export const PlantGraphQLURL = "http://localhost:4000";
// export const AssetGraphQLURL = "http://localhost:4001";
// export const MediaServerURL = "http://localhost:4002";
