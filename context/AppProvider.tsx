import React, { FC, ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";
import { PromoProvider } from "@/context/PromoContext";
import { UserDetailProvider } from "./UserDetailContext";
import { TierProvider } from "./TierContext";
import { StoreProvider } from "./StoreContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <UserProvider>
      <UserDetailProvider>
        <TierProvider>
          <StoreProvider>
            <PromoProvider>{children}</PromoProvider>
          </StoreProvider>
        </TierProvider>
      </UserDetailProvider>
    </UserProvider>
  );
};

export default AppProviders;
