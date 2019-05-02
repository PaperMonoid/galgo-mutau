import * as React from "react";
import Session from "../models/session/Session";

interface SessionContextState {
  session: Session;
  onChange: (session: Session) => void;
}

export default React.createContext<SessionContextState>({
  session: null,
  onChange: null
});
