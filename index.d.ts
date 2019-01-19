import fetch, { RequestInit, Response } from 'node-fetch';

declare module 'cidhook' {
  function pin(domain: string, cid: string, options?: RequestInit): Promise<Response>;
  function unpin(domain: string, cid: string, options?: RequestInit): Promise<Response>;
}
