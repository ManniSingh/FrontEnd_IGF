import userReducer, { setUser } from "../redux/slices/userSlice";
import { mockUsers } from "./mockdata";


describe('userSlice', () => {
  let initialState = { user: null };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = mockUsers[0];
    const action = { type: setUser.type, payload: user };

    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual({ user });
  });

  it('should handle setUser with null', () => {
    const user = null;
    const action = { type: setUser.type, payload: user };

    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual({ user });
  });
});
