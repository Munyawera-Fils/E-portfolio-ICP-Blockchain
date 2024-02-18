import React, { useState } from "react";
import "./newInstitution.scss";
import { useNavigate } from "react-router-dom";
import { backend } from "../declarations/backend";

function NewProfile() {
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [image, setImage] = useState(Uint8Array.of());
  const [date_of_birth, setdate_of_birth] = useState("");
  const [gender, setgender] = useState("");
  const [created_by, setcreated_by] = useState(BigInt(1)); // Replace 12345 with the actual creator's ID
  const [country, setcountry] = useState("");
  const [address, setaddress] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date();
  const id = BigInt(
    currentDate.toISOString().substring(0, 19).replace(/[-T:]/g, "")
  );
  console.log(id);

  const newProfile = async () => {
    setSaving(true);
    try {
      let newProfile = {
        firstname,
        middlename,
        lastname,
        email,
        created_by,
        id,
        phone_number,
        image,
        date_of_birth,
        gender,
        country,
        address,
      };

      // Perform any additional validation or processing here
      console.log(newProfile);
      await backend.newProfile(newProfile);
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };
  const changeFile = async (file: File | undefined) => {
    let data = Uint8Array.of();
    if (file != null) {
      const stream = await file.stream();
      const reader = stream.getReader();
      while (true) {
        const part = await reader.read();
        const chunk = part.value;
        if (chunk == null) {
          break;
        }
        data = concatUint8Arrays(data, chunk);
      }
    }
    setImage(data);
  };

  // TODO: Faster way of concatenation
  const concatUint8Arrays = (
    left: Uint8Array,
    right: Uint8Array
  ): Uint8Array => {
    let temporary: number[] = [];
    for (let element of left) {
      temporary.push(element);
    }
    for (let element of right) {
      temporary.push(element);
    }
    return Uint8Array.from(temporary);
  };
  return (
    <>
      <h1 className="h">Profile registration form</h1>

      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            First Name: <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              placeholder="Enter your First Name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Middle Name (Optional): <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={middlename}
              onChange={(e) => setmiddlename(e.target.value)}
              placeholder="Enter your Middle Name (Optional)"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Last Name: <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              placeholder="Enter your Last Name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Email (Optional): <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your Email (Optional)"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Telephone (Optional): <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={phone_number}
              onChange={(e) => setphone_number(e.target.value)}
              placeholder="Enter your Telephone (Optional)"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Date of birth: <br />
          </div>
          <div className="form-input">
            <input
              type="date"
              value={date_of_birth}
              onChange={(e) => setdate_of_birth(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Gender : <br />
          </div>
          <div className="form-input">
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setgender(e.target.value)}
            />
            Male{" "}
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setgender(e.target.value)}
            />
            Female{" "}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Country of birth: <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              placeholder="Enter your Country of birth"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Address: <br />
          </div>
          <div className="form-input">
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Enter your Address"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Profile Image <br /> :{" "}
          </div>
          <div className="form-input">
            <input
              type="file"
              onChange={(e) => changeFile(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={newProfile}
            disabled={saving}
          >
            Register Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default NewProfile;
