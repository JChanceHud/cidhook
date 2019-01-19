declare module 'cidhook' {
  function pin(domain: string, cid: string): Promise<void>;
  function unpin(domain: string, cid: string): Promise<void>;
}
