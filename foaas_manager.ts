import { firstLevelEnums } from "./enums/enums";

const nodefetch = require('node-fetch');

function randomEnum<T>(enumVal: T): T[keyof T] {
  const enumValues = Object.keys(enumVal).map(n => Number.parseInt(n)).filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]

  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

// hits a random foaas 1 level route and returns the output. 
async function foaasRequestRandom(author: string): Promise<string> {

  let apiRoute = firstLevelEnums[randomEnum(firstLevelEnums)] + author;

  console.log(apiRoute);

  const response = await nodefetch('https://foaas.com' + apiRoute, { method: 'get', headers: {'Accept': 'application/json'}});
  const message = await response.json();
  return message;
}

// hits a targeted foaas level 1 route and returns the output.
async function foaasRequest(route: string, author: string): Promise<string> {

  let apiPath = 'https://foaas.com/' + route + '/' + author;

  const response = await nodefetch(apiPath, { method: 'get', headers: {'Accept': 'application/json'}})
  const message = await response.json();
  return message;
}

module.exports.foaasRequestRandom = foaasRequestRandom
module.exports.foaasRequest = foaasRequest