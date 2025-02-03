import { render, RenderResult } from "@testing-library/react";
import { AuthContext, AuthContextType } from "@/hooks/use-auth";

export function RenderAuthContext({
  ui,
  value,
}: {
  ui: React.ReactElement;
  value: AuthContextType;
}): RenderResult {
  return render(
    <AuthContext.Provider value={value}>{ui}</AuthContext.Provider>
  );
}
