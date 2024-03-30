import React, { useEffect, useState } from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { backend } from "../declarations/backend";

interface NavigationProps {
  isLoggedIn: boolean;
  handleLoginStatus: (status: boolean) => void;
}

function Navigation({ isLoggedIn, handleLoginStatus }: NavigationProps) {
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
  const [needLogin, setNeedLogin] = useState(true);

  const authClientPromise = AuthClient.create();

  const signIn = async () => {
    const authClient = await authClientPromise;

    const internetIdentityUrl = import.meta.env.PROD
      ? undefined
      : `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => resolve(undefined),
      });
    });

    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(false);
    handleLoginStatus(true);
  };

  const signOut = async () => {
    const authClient = await authClientPromise;
    await authClient.logout();
    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(true);
    handleLoginStatus(false);
  };

  const updateIdentity = (identity: Identity) => {
    setPrincipal(identity.getPrincipal());
    (Actor.agentOf(backend) as HttpAgent).replaceIdentity(identity);
  };

  const setInitialIdentity = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      updateIdentity(identity);
      setNeedLogin(!(await authClient.isAuthenticated()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInitialIdentity();
  }, []);

  return (
    <>
      <div className="menu">
        {!needLogin ? (
          <>
            {/* <div className="menu-item button_new">
              <Link to="/">Dashboard</Link>
            </div>

            <div className="menu-item button_new">
              <Link to="/NewProfile">Create Profile</Link>
            </div>
            <div className="menu-item button_new">
              <Link to="/RecordExperience">Record new Experience</Link>
            </div>
            <div className="menu-item button_new">
              <Link to="/AssignCertificate">Assign Certificate</Link>
            </div> */}

            <div className="menu-item-button button_new">
              <div className="principal text">
                Welcome Back, Logged as: {principal?.toString()}
              </div>
            </div>

            <div className="menu-item-button button_newlogin" onClick={signOut}>
              Sign Out
            </div>
          </>
        ) : (
          <>
            <div className="menu-item button_new">
              <Link to="/">Home</Link>
            </div>

            <div className="menu-item button_new">
              <Link to="/VerifyProfile">Verify Profile</Link>
            </div>

            <div className="menu-item button_new">
              <Link to="/newInstitution">Submit Request</Link>
            </div>

            <div className="menu-item button_new">
              <Link to="/viewInstitution">View Institutions</Link>
            </div>

            <div className="menu-item-button button_newlogin" onClick={signIn}>
              Sign in
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navigation;
