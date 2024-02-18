import React, { useEffect, useState } from "react";
import "./DashboardStyle.scss";
import "./DashboardResponsive.scss";
import { Link } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { backend } from "../declarations/backend";
import NewProfile from "./newProfile";
import RecordExperience from "./RecordExperience";
import AssignCertificate from "./AssignCertificate";
import Image1 from "./assets/photo1.jpeg";
import Image2 from "./assets/photo2.jpeg";
import Image3 from "./assets/photo3.jpeg";
import Image4 from "./assets/photo4.jpeg";
import Image5 from "./assets/emmizo_new.jpg";
import Image6 from "./assets/fils.jpeg";
import Image7 from "./assets/mavin-removebg-preview.jpg";

interface NavigationProps {
  isLoggedIn: boolean;
  handleLoginStatus: (status: boolean) => void;
}

function Dashboard({ isLoggedIn, handleLoginStatus }: NavigationProps) {
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
  const [needLogin, setNeedLogin] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

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

  const renderSelectedModule = () => {
    switch (selectedMenu) {
      case "createProfile":
        return <NewProfile />;
      case "recordExperience":
        return <RecordExperience />;
      case "assignCertificate":
        return <AssignCertificate />;
      default:
        return (
          <div>
            <div className="box-container">
              <div className="box box1">
                <div className="text">
                  <h2 className="topic-heading">5</h2>
                  <h2 className="topic">Registered Institutions</h2>
                </div>
              </div>
              <div className="box box2">
                <div className="text">
                  <h2 className="topic-heading">7</h2>
                  <h2 className="topic">Registered Profiles</h2>
                </div>
              </div>
              <div className="box box3">
                <div className="text">
                  <h2 className="topic-heading">4</h2>
                  <h2 className="topic">Registered Certificates</h2>
                </div>
              </div>
              <div className="box box4">
                <div className="text">
                  <h2 className="topic-heading">2</h2>
                  <h2 className="topic">Registered Work Experiences</h2>
                </div>
              </div>
            </div>
            <div className="report-container">
              <div className="report-header">
                <h1 className="recent-Articles">Recent created profiles</h1>
              </div>
              <div className="report-body">
                <div className="report-topic-heading">
                  <h3 className="t-op">Image</h3>
                  <h3 className="t-op">Name</h3>
                  <h3 className="t-op">Phone</h3>
                  <h3 className="t-op">More</h3>
                  <h3 className="t-op">Documents</h3>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image1} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Murenzi Abdallah</h3>
                    <h3 className="t-op-nextlvl">+250 788 907 657 </h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image2} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Karenzi Karake</h3>
                    <h3 className="t-op-nextlvl">+250 788 098 768 </h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image3} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Mulisa Emmanuel</h3>
                    <h3 className="t-op-nextlvl">+250 788 890 760 </h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image4} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Hakizimana Ignace</h3>
                    <h3 className="t-op-nextlvl">+250 788 567 345</h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image5} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Kwizera Emmanuel</h3>
                    <h3 className="t-op-nextlvl">+250 788 650 769</h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image6} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Munyawera Fils</h3>
                    <h3 className="t-op-nextlvl">+250 788 089 143</h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
                <div className="items">
                  <div className="item1">
                    <h3 className="t-op-nextlvl">
                      <div className="profile-image">
                        <img src={Image7} alt="Profile image" />
                      </div>
                    </h3>
                    <h3 className="t-op-nextlvl">Sebakara Maic</h3>
                    <h3 className="t-op-nextlvl">+250 788 089 143</h3>
                    <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                    <h3 className="view">Get Doc</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              <h3 onClick={() => setSelectedMenu("dashboard")}>
                <div className="nav-option option1">Dashboard</div>
              </h3>
              <h3 onClick={() => setSelectedMenu("createProfile")}>
                <div className="nav-option option1">Create Profile</div>
              </h3>
              <h3 onClick={() => setSelectedMenu("recordExperience")}>
                <div className="nav-option option1">Record Experience</div>
              </h3>
              <h3 onClick={() => setSelectedMenu("assignCertificate")}>
                <div className="nav-option option1">Assign Certificate</div>
              </h3>
            </div>
          </nav>
        </div>

        <div className="main">{renderSelectedModule()}</div>
      </div>
    </>
  );
}

export default Dashboard;
