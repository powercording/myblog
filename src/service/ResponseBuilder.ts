type SuccessStatusCode = 200 | 201 | 202;
type failStatusCode = 400 | 401 | 403 | 404 | 500;

export type Resolved = {
  status: SuccessStatusCode;
  ok: true;
  data?: any;
  message?: string;
  error: null;
};

export type Rejected = {
  status: failStatusCode;
  ok: false;
  data?: any;
  message?: string;
  error: { message: string };
};

class ResponseBuilder {
  private Response: Resolved | Rejected;
  constructor() {
    this.Response = {
      status: 200,
      ok: true,
      error: null,
    };
  }

  public setStatus(status: SuccessStatusCode | failStatusCode): ResponseBuilder {
    this.Response.status = status;
    return this;
  }
 
  public setOk(ok: boolean): ResponseBuilder {
    this.Response.ok = ok;
    return this;
  }

  public setData(data: any): ResponseBuilder {
    this.Response.data = data;
    return this;
  }

  public setMessage(message: string): ResponseBuilder {
    this.Response.message = message;
    return this;
  }

  public setError(error: { message: string }): ResponseBuilder {
    this.Response.error = error;
    return this;
  }

  public build(): Resolved | Rejected {
    return this.Response;
  }
}

export default ResponseBuilder;
