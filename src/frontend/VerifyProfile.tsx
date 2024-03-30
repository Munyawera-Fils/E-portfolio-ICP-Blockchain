import React, { useState } from "react";
import "./newInstitution.scss";
import "./verifyProfile.scss";
import profileData from "./profiledata.json";

interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  phone_number: string;
  country: string;
  address: string;
  // Add other profile properties
}

interface Certification {
  profile_id: string;
  id: string;
  description: string;
  start_date: string;
  end_date: string;
  // Add other certification properties
}

interface Education {
  profile_id: string;
  id: string;
  academic_level: string;
  school_name: string;
  start_date: string;
  end_date: string;
  // Add other education properties
}

interface Experience {
  profile_id: string;
  id: string;
  // Define experience properties
}

function VerifyProfile() {
  const [saving, setSaving] = useState(false);
  const [profile_id, setProfileId] = useState("");
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [certificationData, setCertificationData] = useState<Certification[]>(
    []
  );
  const [experienceData, setExperienceData] = useState<Experience[]>([]);

  const fetchData = () => {
    // Fetch data based on profile_id
    // For now, I'm just setting some example data
    const exampleProfileData: Profile = {
      id: "12345678901234567890",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      gender: "male",
      phone_number: "+250786000000",
      country: "Rwanda",
      address: "kigali - remera",
    };
    const exampleEducationData: Education[] = [
      {
        profile_id: "12345678901234567890",
        id: "1",
        academic_level: "Advanced level MPC",
        school_name: "Kiziguro SS",
        start_date: "2010-09-01",
        end_date: "2014-06-01",
      },
      {
        profile_id: "12345678901234567890",
        id: "1",
        academic_level: "Bachelor's Degree in Information Technology",
        school_name: "University of Kigali",
        start_date: "2010-09-01",
        end_date: "2014-06-01",
      },
    ];
    const exampleCertificationData: Certification[] = [
      {
        profile_id: "12345678901234567890",
        id: "1",
        description: "Advanced Networking Certificate",
        start_date: "2015-01-01",
        end_date: "2015-12-31",
      },
      {
        profile_id: "12345678901234567890",
        id: "1",
        description: "CISCO",
        start_date: "2018-09-11",
        end_date: "2019-09-11",
      },
      {
        profile_id: "12345678901234567890",
        id: "1",
        description: "INTERNET SECURITY",
        start_date: "2022-05-06",
        end_date: "2022-07-08",
      },
    ];
    const exampleExperienceData: Experience[] = [];

    setProfileData(exampleProfileData);
    setEducationData(exampleEducationData);
    setCertificationData(exampleCertificationData);
    setExperienceData(exampleExperienceData);
    setShowProfileInfo(true);
  };

  const VerifyProfile = () => {
    // if (profile_id.length === 20) {
    fetchData();
    // } else {
    //   console.log("invalid id");
    // }
  };

  return (
    <>
      <h4 className="h">Verify Profile by ID</h4>

      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            Enter ID: <br />{" "}
          </div>
          <div className="form-input">
            <input
              type="text"
              value={profile_id}
              onChange={(e) => setProfileId(e.target.value)}
              placeholder="Enter profile ID, ex: 1"
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={VerifyProfile}
            disabled={saving}
          >
            Verify
          </button>
        </div>
      </div>

      {showProfileInfo && (
        <div className="profile-info">
          <h2 className="h2new">Profile Information</h2>

          <div>
            <h3 className="header-item">Profile</h3>
            <p>
              {profileData?.firstname} {profileData?.lastname}
            </p>
            <p>Email: {profileData?.email}</p>
            <p>gender: {profileData?.gender}</p>
            <p>Phone Number:{profileData?.phone_number} </p>
            <p>Country: {profileData?.country}</p>
            <p>Address: {profileData?.address}</p>
          </div>
          <div>
            <h3 className="header-item">Education</h3>
            {educationData.map((education) => (
              <div key={education.id}>
                <p>
                  {education.academic_level} - {education.school_name}
                </p>
                <p>
                  {education.start_date} - {education.end_date}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="header-item">Certifications</h3>
            {certificationData.map((certification) => (
              <div key={certification.id}>
                <p>{certification.description}</p>
                <p>
                  {certification.start_date} - {certification.end_date}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="header-item">Experience</h3>
            {experienceData.length === 0 ? (
              <p>No Experiences</p>
            ) : (
              experienceData.map((experience) => (
                // Render experience data here
                <div key={experience.id}></div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VerifyProfile;
