import { StateSchema } from "app/providers/StoreProvider";
import { getIsAuth } from "./getIsAuth";

describe("getIsAuth", () => {
  test("getIsAuth return true if authData exist", () => {
    expect(
      getIsAuth({
        user: { authData: { id: "1", username: "vas" } },
      } as StateSchema)
    ).toBe(true);
  });
  test("getIsAuth return false if authData doesn't exist", () => {
    expect(getIsAuth({ user: { authData: null } } as StateSchema)).toBe(false);
  });
});
