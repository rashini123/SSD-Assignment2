import axios from "axios";
import https from "https";

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const API_Endpoint = "https://localhost:5000/api/";

describe("POST /api/users/login", () => {
  it("should login user", async () => {
    const res = await instance.post(API_Endpoint + "users/login", {
      usernameOrEmail: "namal@gmail.com",
      password: "111111",
    });
    expect(res.status).toBe(200);
  });
});

describe("Post /api/users", () => {
  it("should admin create user", async () => {
    const res = await instance.post(
      API_Endpoint + "users/",
      {
        name: "Test User",
        username: "test",
        email: "test@gmail.com",
        password: "111111",
        type: "Worker",
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRjZjgyZGVkMWViNjhlYzNjNmJjNSIsImlhdCI6MTY2ODE2MzY2MywiZXhwIjoxNjcwNzU1NjYzfQ.lFElXBX-WHMq44P9h9rTy2Y5NgHA3E9yOF2MCZJAFzQ",
        },
      }
    );
    expect(res.status).toBe(201);
  });
});

describe("GET /api/users/", () => {
  it("should admin get all users", async () => {
    const res = await instance.get(API_Endpoint + "users/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRjZjgyZGVkMWViNjhlYzNjNmJjNSIsImlhdCI6MTY2ODE2MzY2MywiZXhwIjoxNjcwNzU1NjYzfQ.lFElXBX-WHMq44P9h9rTy2Y5NgHA3E9yOF2MCZJAFzQ",
      },
    });
    expect(res.status).toBe(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should auth user get user data by id", async () => {
    const res = await instance.get(
      API_Endpoint + "users/6375f68049130c51c88cf9db",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRjZjgyZGVkMWViNjhlYzNjNmJjNSIsImlhdCI6MTY2ODE2MzY2MywiZXhwIjoxNjcwNzU1NjYzfQ.lFElXBX-WHMq44P9h9rTy2Y5NgHA3E9yOF2MCZJAFzQ",
        },
      }
    );
    expect(res.status).toBe(200);
  });
});

describe("GET /api/users/:token", () => {
  it("should any user can validate token", async () => {
    const res = await instance.get(
      API_Endpoint +
        "users/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRjZjgyZGVkMWViNjhlYzNjNmJjNSIsImlhdCI6MTY2ODE2MzY2MywiZXhwIjoxNjcwNzU1NjYzfQ.lFElXBX-WHMq44P9h9rTy2Y5NgHA3E9yOF2MCZJAFzQ",
      {}
    );
    expect(res.status).toBe(200);
  });
});

describe("GET /api/users/all", () => {
  it("should auth user get all users for messaging", async () => {
    const res = await instance.get(API_Endpoint + "users/all", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRjZjgyZGVkMWViNjhlYzNjNmJjNSIsImlhdCI6MTY2ODE2MzY2MywiZXhwIjoxNjcwNzU1NjYzfQ.lFElXBX-WHMq44P9h9rTy2Y5NgHA3E9yOF2MCZJAFzQ",
      },
    });
    expect(res.status).toBe(200);
  });
});

describe("GET /api/messages/sent/:id", () => {
  it("should worker get sent messages", async () => {
    const res = await instance.get(
      API_Endpoint + "messages/sent/636dd0f7ff36a87300fd2ae4",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmU1MmNhYjQ4OTBlNzM3NDU4YWViMyIsImlhdCI6MTY2ODE3NDU1NCwiZXhwIjoxNjcwNzY2NTU0fQ.8F4JZAonadv8vbbkW4g4DTvdz6_kenEvnKFk7zFCDzA",
        },
      }
    );
    expect(res.status).toBe(200);
  });
});

describe("GET /api/messages/received/:id", () => {
  it("should worker get received messages", async () => {
    const res = await instance.get(
      API_Endpoint + "messages/received/636dd0f7ff36a87300fd2ae4",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmU1MmNhYjQ4OTBlNzM3NDU4YWViMyIsImlhdCI6MTY2ODE3NDU1NCwiZXhwIjoxNjcwNzY2NTU0fQ.8F4JZAonadv8vbbkW4g4DTvdz6_kenEvnKFk7zFCDzA",
        },
      }
    );
    expect(res.status).toBe(200);
  });
});

describe("POST /api/messages/", () => {
  it("should worker send message", async () => {
    const res = await instance.post(
      API_Endpoint + "messages/",
      {
        sender: "636e52cab4890e737458aeb3",
        receiver: "63727aee4f529126045a3320",
        message: "hi test!",
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmU1MmNhYjQ4OTBlNzM3NDU4YWViMyIsImlhdCI6MTY2ODE3NDU1NCwiZXhwIjoxNjcwNzY2NTU0fQ.8F4JZAonadv8vbbkW4g4DTvdz6_kenEvnKFk7zFCDzA",
        },
      }
    );
    expect(res.status).toBe(201);
  });
});

describe("GET /api/documents", () => {
  it("should manager get all documents", async () => {
    const res = await instance.get(API_Endpoint + "documents", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRkMGY3ZmYzNmE4NzMwMGZkMmFlNCIsImlhdCI6MTY2ODE0NDUyOSwiZXhwIjoxNjcwNzM2NTI5fQ.sX8zgUn5oUGs_yjgfxgCmprkN4lCY-HrB-RDQCp97RQ",
      },
    });
    expect(res.status).toBe(200);
  });
});

describe("GET /api/documents/download/:id/:token", () => {
  it("should manager view document", async () => {
    const res = await instance.get(
      API_Endpoint +
        "documents/download/63726eeb4f529126045a3301/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRkMGY3ZmYzNmE4NzMwMGZkMmFlNCIsImlhdCI6MTY2ODE0NDUyOSwiZXhwIjoxNjcwNzM2NTI5fQ.sX8zgUn5oUGs_yjgfxgCmprkN4lCY-HrB-RDQCp97RQ"
    );
    expect(res.status).toBe(200);
  });
});
