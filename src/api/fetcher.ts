class Fetcher {
  authorizationToken: string = "";

  async fetch(
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {
    const response =
      typeof init === "undefined"
        ? await fetch(input, {
            headers: {
              authorization: this.authorizationToken,
            },
          })
        : await fetch(input, {
            ...init,
            headers: {
              authorization: `Bearer ${this.authorizationToken}`,
            },
          });
    return response;
  }
}

export const fetcher = new Fetcher();
