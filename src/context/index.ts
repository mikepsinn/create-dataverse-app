import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import { createContext } from "react";
import { Model, Output } from "../types";
import { getModelByName, getOutput } from "../utils/model";

interface ContextType {
  runtimeConnector: RuntimeConnector;
  appVersion: string;
  output: Output;
}

export const Context = createContext<ContextType>({} as ContextType);

const runtimeConnector = new RuntimeConnector(Extension);
const appVersion = "0.0.1";
const output = getOutput();

export const contextStore = {
  runtimeConnector,
  appVersion,
  output,
};
