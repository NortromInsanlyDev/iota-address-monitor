import { get, writable } from "svelte/store";
import { SingleNodeClient } from "@iota/iota.js";
import type { Address } from "../typings/address";
import { IOTA_ENDPOINT } from "../constants";
const client = new SingleNodeClient(IOTA_ENDPOINT);
export const AddressStore = writable<Address[]>([], function start(set) {
  const interval = setInterval(async () => {
    let newStore: Address[] = [];

    const addresses = get(AddressStore);
    for (const address of addresses) {
      const value = await client.address(address.address);
      newStore.push({ address: address.address, balance: value.balance });
    }
    set(
      newStore.filter(
        (e) => get(AddressStore).findIndex((v) => v.address == e.address) != -1
      )
    );
  }, 2000);

  return function stop() {
    clearInterval(interval);
  };
});

export const getBalanceByAddressBech32 = async (addressBech32: string) => {
  try {
    const resp = await client.address(addressBech32);
    return resp.balance;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOutputByAddress = async (addressBech32: string) => {
  try {
    const resp = await client.addressOutputs(addressBech32);
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOutputById = async (outputId: string) => {
  try {
    const resp = await client.output(outputId);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
