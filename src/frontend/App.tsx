import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstitutionList from "./InstitutionList";
import Navigation from "./Navigation";
import ImageSlider from "./ImageSlider";
import NewInstitution from "./newInstitution";
import NewProfile from "./newProfile";
import VerifyProfile from "./VerifyProfile";
import RecordExperience from "./RecordExperience";
import InstitutionDetail from "./InstitutionDetail";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import AssignCertificate from "./AssignCertificate";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatus = (
    status: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsLoggedIn(status);
  };

  return (
    <BrowserRouter>
      <div>
        <Navigation
          isLoggedIn={isLoggedIn}
          handleLoginStatus={handleLoginStatus}
        />
        {isLoggedIn ? (
          <Dashboard
            isLoggedIn={false}
            handleLoginStatus={function (status: boolean): void {
              throw new Error("Function not implemented.");
            }}
          /> // Render Dashboard component if user is logged in
        ) : (
          <>
            <ImageSlider />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/viewInstitution" element={<InstitutionList />} />
                <Route path="/newInstitution" element={<NewInstitution />} />
                <Route
                  path="/viewInstitution/:id"
                  element={<InstitutionDetail />}
                />
                <Route path="/newProfile" element={<NewProfile />} />
                <Route path="/VerifyProfile" element={<VerifyProfile />} />

                <Route
                  path="/RecordExperience"
                  element={<RecordExperience />}
                />
                <Route
                  path="/AssignCertificate"
                  element={<AssignCertificate />}
                />
              </Routes>
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <div className="welcome-content">
        <h1>Welcome to The e-Portfolio</h1>
        <p>
          The e-portfolio is a digital repository powered by blockchain
          technology, designed to comprehensively document an individual's
          educational journey, certifications, training programs, and employment
          history.
        </p>

        <div className="grid-content">
          <div className="grid-item">
            <h2>Data Privacy</h2>
            <p>Ensures data privacy and confidentiality through encryption.</p>
          </div>
          <div className="grid-item">
            <h2>Scalability</h2>
            <p>Designed for scalability to accommodate growing portfolios.</p>
          </div>
        </div>

        <div className="grid-content2">
          <div className="grid-item2">
            <h2>Educational Journey</h2>
            <p>
              Record and track your academic achievements, courses, and degrees.
            </p>
          </div>
          <div className="grid-item2">
            <h2>Certifications</h2>
            <p>
              Store and verify your professional certifications and
              qualifications.
            </p>
          </div>
          <div className="grid-item2">
            <h2>Training Programs</h2>
            <p>
              Document your participation in various training programs and
              workshops.
            </p>
          </div>
          <div className="grid-item2">
            <h2>Employment History</h2>
            <p>
              Keep a detailed record of your work experience and career
              milestones.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
