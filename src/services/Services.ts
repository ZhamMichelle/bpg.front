import { server } from "./server";

const webConfigEnv = (window as any).env;

export enum FormState {
    CREATE,
    EDIT,
    READ,
    ARCHANDNEW,
  }

  export class ClientData {
    id?: number;
    surname?: string;
    name?: string;
    patronymic?: string;
    age?: number;
    phoneNumber?: string;
    complaint?: string;
    advanceDiagnosis?: string;
    appointment?: string;
    creationDate?: Date;
    modificationDate?: Date;
  }

  export class Services {
    async getCards(): Promise<ClientData[]> {
      return server.get(`/cards`, {
        baseURL: "http://localhost:8080",
      });
    }
  
    async getCard(id: number): Promise<ClientData> {
      return server.get(`/card/${id}`, {
        // baseURL: webConfigEnv.BPG_BACK,
        baseURL: "http://localhost:8080",
      });
    }
  
    async postCard(clientData: ClientData): Promise<ClientData> {
      return server.post(`/card/create`, clientData, {
        baseURL: "http://localhost:8080",
      });
    }

    async putCard(id: number, clientData: ClientData): Promise<ClientData> {
      return server.put(`/card/update/?id=${id}`, clientData, {
        baseURL: "http://localhost:8080",
      });
    }
  
  
  
  }
  